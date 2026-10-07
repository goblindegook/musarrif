import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import { playKeyClick } from '../../../modules/musarrif-apple-services/src/KeyClick'
import { DEFAULT_FILTERS } from './filter-model'
import { VerbBuilder } from './VerbBuilder'
import { VerbList } from './VerbList'

function hasIncludedVerb(label: string) {
  return screen.getAllByTestId('verb-row').some((row) => row.props.accessibilityLabel === label)
}

jest.mock('../../../modules/musarrif-apple-services/src/KeyClick', () => ({ playKeyClick: jest.fn() }))

beforeEach(() => jest.useFakeTimers())

afterEach(async () => {
  await act(() => jest.runOnlyPendingTimers())
  jest.useRealTimers()
})

describe('native browse flow', () => {
  test('searches within the included verbs on the same list screen', async () => {
    await render(<VerbList language="en" query="kataba" onSelect={jest.fn<void, [DisplayVerb]>()} />)

    expect(screen.getByRole('button', { name: /كَتَبَ.*to write/u })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /كَانَ/u })).toBeNull()
  })

  test('uses the selected diacritics setting for search results', async () => {
    await render(<VerbList language="en" query="kataba" diacriticsPreference="none" onSelect={jest.fn()} />)

    expect(screen.getAllByRole('button', { name: /كتب.*to write/u }).length).toBeGreaterThan(0)
    expect(screen.queryByText('كَتَبَ')).toBeNull()
  })

  test.each([
    ['Arabic lemma', 'كَتَبَ'],
    ['inflected Arabic form', 'يكتب'],
    ['Buckwalter root', 'ktb'],
    ['romanized lemma', 'kataba'],
    ['English translation', 'write'],
  ])('selects the canonical verb for a %s query', async (_description, query) => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    await render(<VerbList language="en" query={query} onSelect={onSelect} />)

    await fireEvent.press(screen.getByRole('button', { name: 'كَتَبَ, Form I, ◌َ / ◌ُ, to write' }))

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'ktb-1' }))
  })

  test('builds a verb from three root letters, a form, and the selected Form I vowel pattern', async () => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    await render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <VerbBuilder language="en" onSelect={onSelect} />
      </SafeAreaProvider>,
    )

    await fireEvent.press(screen.getByTestId('root-slot-1'))
    await act(() => screen.UNSAFE_getByProps({ testID: 'letter-ث' }).props.onPress())
    expect(playKeyClick).toHaveBeenCalledTimes(1)
    await fireEvent.press(screen.getByTestId('root-slot-2'))
    await act(() => screen.UNSAFE_getByProps({ testID: 'letter-ن' }).props.onPress())
    await fireEvent.press(screen.getByTestId('root-slot-3'))
    await act(() => screen.UNSAFE_getByProps({ testID: 'letter-ي' }).props.onPress())
    await fireEvent.press(screen.getByTestId('form-1'))
    await fireEvent.press(screen.getByTestId('pattern-a-i'))
    await fireEvent.press(screen.getByTestId('build-submit'))

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ root: 'ثني', form: 1, vowels: 'a-i' }))
  })

  test('names the verb on the build button once the root is complete', async () => {
    const submitLabel = () => String(screen.getByTestId('build-submit').props.children.props.children)
    await render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <VerbBuilder diacriticsPreference="all" language="en" onSelect={jest.fn()} />
      </SafeAreaProvider>,
    )

    expect(submitLabel()).toBe('Conjugate')
    await fireEvent.press(screen.getByTestId('root-slot-1'))
    await act(() => screen.UNSAFE_getByProps({ testID: 'letter-ث' }).props.onPress())
    await fireEvent.press(screen.getByTestId('root-slot-2'))
    await act(() => screen.UNSAFE_getByProps({ testID: 'letter-ن' }).props.onPress())
    await fireEvent.press(screen.getByTestId('root-slot-3'))
    await act(() => screen.UNSAFE_getByProps({ testID: 'letter-ي' }).props.onPress())
    await fireEvent.press(screen.getByTestId('pattern-a-i'))

    expect(submitLabel()).toBe('Conjugate ثَنَى')
  })

  test('selects a verb from the favorites-filtered list', async () => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    await render(
      <VerbList
        filters={{ ...DEFAULT_FILTERS, group: 'favourites' }}
        language="en"
        favouriteVerbIDs={new Set(['ktb-1'])}
        onSelect={onSelect}
      />,
    )

    await fireEvent.press(screen.getByTestId('verb-row'))

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'ktb-1' }))
  })

  test('switches between frequency and Arabic alphabetical order', async () => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    const { rerender } = await render(<VerbList language="en" onSelect={onSelect} />)

    expect(hasIncludedVerb('كَانَ, Form I, ◌َ / ◌ُ, to be')).toBe(true)
    await rerender(<VerbList filters={{ ...DEFAULT_FILTERS, sort: 'alphabetical' }} language="en" onSelect={onSelect} />)
    expect(hasIncludedVerb('كَانَ, Form I, ◌َ / ◌ُ, to be')).toBe(false)
  })

  test('intersects form, root, and group filters and keeps the group filter exclusive', async () => {
    const favorites = new Set(['ktb-1', 'ktb-2'])
    const onSelect = jest.fn<void, [DisplayVerb]>()
    const { rerender } = await render(
      <VerbList
        filters={{ ...DEFAULT_FILTERS, form: '1', rootShapes: ['sound'], group: 'favourites' }}
        language="en"
        favouriteVerbIDs={favorites}
        onSelect={onSelect}
      />,
    )

    expect(hasIncludedVerb('كَتَبَ, Form I, ◌َ / ◌ُ, to write')).toBe(true)

    await rerender(
      <VerbList
        filters={{ ...DEFAULT_FILTERS, group: 'kana' }}
        language="en"
        favouriteVerbIDs={favorites}
        onSelect={onSelect}
      />,
    )
    expect(hasIncludedVerb('كَانَ, Form I, ◌َ / ◌ُ, to be')).toBe(true)
  })
})
