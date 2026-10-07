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

afterEach(() => {
  act(() => jest.runOnlyPendingTimers())
  jest.useRealTimers()
})

describe('native browse flow', () => {
  test('searches within the included verbs on the same list screen', () => {
    render(<VerbList language="en" query="kataba" onSelect={jest.fn<void, [DisplayVerb]>()} />)

    expect(screen.getByRole('button', { name: /كَتَبَ.*to write/u })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /كَانَ/u })).toBeNull()
  })

  test('uses the selected diacritics setting for search results', () => {
    render(<VerbList language="en" query="kataba" diacriticsPreference="none" onSelect={jest.fn()} />)

    expect(screen.getAllByRole('button', { name: /كتب.*to write/u }).length).toBeGreaterThan(0)
    expect(screen.queryByText('كَتَبَ')).toBeNull()
  })

  test.each([
    ['Arabic lemma', 'كَتَبَ'],
    ['inflected Arabic form', 'يكتب'],
    ['Buckwalter root', 'ktb'],
    ['romanized lemma', 'kataba'],
    ['English translation', 'write'],
  ])('selects the canonical verb for a %s query', (_description, query) => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    render(<VerbList language="en" query={query} onSelect={onSelect} />)

    fireEvent.press(screen.getByRole('button', { name: 'كَتَبَ, Form I, ◌َ / ◌ُ, to write' }))

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'ktb-1' }))
  })

  test('builds a verb from three root letters, a form, and the selected Form I vowel pattern', () => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <VerbBuilder language="en" onSelect={onSelect} />
      </SafeAreaProvider>,
    )

    fireEvent.press(screen.getByTestId('root-slot-1'))
    act(() => screen.UNSAFE_getByProps({ testID: 'letter-ث' }).props.onPress())
    expect(playKeyClick).toHaveBeenCalledTimes(1)
    fireEvent.press(screen.getByTestId('root-slot-2'))
    act(() => screen.UNSAFE_getByProps({ testID: 'letter-ن' }).props.onPress())
    fireEvent.press(screen.getByTestId('root-slot-3'))
    act(() => screen.UNSAFE_getByProps({ testID: 'letter-ي' }).props.onPress())
    fireEvent.press(screen.getByTestId('form-1'))
    fireEvent.press(screen.getByTestId('pattern-a-i'))
    fireEvent.press(screen.getByTestId('build-submit'))

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ root: 'ثني', form: 1, vowels: 'a-i' }))
  })

  test('names the verb on the build button once the root is complete', () => {
    const submitLabel = () => String(screen.getByTestId('build-submit').props.children.props.children)
    render(
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
    fireEvent.press(screen.getByTestId('root-slot-1'))
    act(() => screen.UNSAFE_getByProps({ testID: 'letter-ث' }).props.onPress())
    fireEvent.press(screen.getByTestId('root-slot-2'))
    act(() => screen.UNSAFE_getByProps({ testID: 'letter-ن' }).props.onPress())
    fireEvent.press(screen.getByTestId('root-slot-3'))
    act(() => screen.UNSAFE_getByProps({ testID: 'letter-ي' }).props.onPress())
    fireEvent.press(screen.getByTestId('pattern-a-i'))

    expect(submitLabel()).toBe('Conjugate ثَنَى')
  })

  test('selects a verb from the favorites-filtered list', () => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    render(
      <VerbList
        filters={{ ...DEFAULT_FILTERS, group: 'favourites' }}
        language="en"
        favouriteVerbIDs={new Set(['ktb-1'])}
        onSelect={onSelect}
      />,
    )

    fireEvent.press(screen.getByTestId('verb-row'))

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'ktb-1' }))
  })

  test('switches between frequency and Arabic alphabetical order', () => {
    const onSelect = jest.fn<void, [DisplayVerb]>()
    const { rerender } = render(<VerbList language="en" onSelect={onSelect} />)

    expect(hasIncludedVerb('كَانَ, Form I, ◌َ / ◌ُ, to be')).toBe(true)
    rerender(<VerbList filters={{ ...DEFAULT_FILTERS, sort: 'alphabetical' }} language="en" onSelect={onSelect} />)
    expect(hasIncludedVerb('كَانَ, Form I, ◌َ / ◌ُ, to be')).toBe(false)
  })

  test('intersects form, root, and group filters and keeps the group filter exclusive', () => {
    const favorites = new Set(['ktb-1', 'ktb-2'])
    const onSelect = jest.fn<void, [DisplayVerb]>()
    const { rerender } = render(
      <VerbList
        filters={{ ...DEFAULT_FILTERS, form: '1', rootShapes: ['sound'], group: 'favourites' }}
        language="en"
        favouriteVerbIDs={favorites}
        onSelect={onSelect}
      />,
    )

    expect(hasIncludedVerb('كَتَبَ, Form I, ◌َ / ◌ُ, to write')).toBe(true)

    rerender(
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
