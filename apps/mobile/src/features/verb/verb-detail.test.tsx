import { act, fireEvent, render, screen, within } from '@testing-library/react-native'
import * as Clipboard from 'expo-clipboard'
import { getVerbById } from '../../../../../src/paradigms/verbs'
import * as EditMenu from '../../../modules/musarrif-apple-services/src/EditMenu'
import { arabicSpeechOutput } from '../../speech-synthesis/arabic-speech'
import { VerbDetail } from './VerbDetail'

jest.mock('../../../modules/musarrif-apple-services/src/EditMenu', () => ({
  presentEditMenu: jest.fn(),
  lookUp: jest.fn(),
  translate: jest.fn(),
}))
jest.mock('expo-clipboard', () => ({ setStringAsync: jest.fn() }))
jest.mock('../../speech-synthesis/arabic-speech', () => ({
  arabicSpeechOutput: { speakArabic: jest.fn(() => Promise.resolve()) },
}))

const english = {
  language: 'en' as const,
  diacriticsPreference: 'all' as const,
  onOpenVerb: jest.fn(),
}

const tenses = () => within(screen.getByRole('radiogroup', { name: 'Select tense' }))
const moods = () => within(screen.getByRole('radiogroup', { name: 'Select mood' }))
const passiveSwitch = () => screen.getByRole('switch', { name: 'Passive' })

describe('native verb detail', () => {
  beforeEach(() => {
    english.onOpenVerb.mockClear()
  })

  test('defaults to active past and exposes root, form, and all 13 pronoun rows', async () => {
    const verb = getVerbById('ktb-1')!
    await render(<VerbDetail verb={verb} {...english} />)

    expect(screen.queryByRole('header', { name: verb.lemma })).toBeNull()
    expect(screen.queryByText(/Verb:/u)).toBeNull()
    expect(screen.getByText('ك ت ب')).toBeTruthy()
    expect(within(screen.getByRole('button', { name: 'Form insights' })).getByText('I')).toBeTruthy()
    expect(passiveSwitch()).not.toBeChecked()
    expect(tenses().getByRole('radio', { name: 'Past' })).toBeSelected()
    expect(screen.getAllByTestId('conjugation-form')).toHaveLength(13)
    expect(screen.queryByRole('button', { name: 'Add to favorites' })).toBeNull()
  })

  test.each([
    [0, '1st s.'],
    [1, '2nd m. s.'],
    [3, '3rd m. s.'],
    [4, '3rd f. s.'],
    [5, '2nd d.'],
  ])('labels paradigm row %i with its pronoun abbreviation %s', async (index, abbreviation) => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    expect(within(screen.getAllByTestId('conjugation-form')[index]).getByText(abbreviation)).toBeTruthy()
  })

  test('shows the selected verb translation above the paradigm', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    expect(screen.getByTestId('verb-translation').props.children).toBe('to write')
  })

  test('keeps mood when changing voices and offers only active imperative', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    await fireEvent.press(tenses().getByRole('radio', { name: 'Present' }))
    await fireEvent.press(moods().getByRole('radio', { name: 'Subjunctive' }))
    await fireEvent.press(passiveSwitch())
    expect(passiveSwitch()).toBeChecked()
    expect(moods().getByRole('radio', { name: 'Subjunctive' })).toBeSelected()
    expect(tenses().getAllByRole('radio')).toHaveLength(3)

    await fireEvent.press(passiveSwitch())
    expect(moods().getByRole('radio', { name: 'Subjunctive' })).toBeSelected()
    await fireEvent.press(tenses().getByRole('radio', { name: 'Imperative' }))
    expect(passiveSwitch()).toBeDisabled()
    expect(screen.queryByLabelText('Select mood')).toBeNull()
    expect(screen.getAllByTestId('conjugation-form')).toHaveLength(5)
  })

  test('locks paradigms that are unavailable for the selected verb', async () => {
    await render(<VerbDetail verb={getVerbById('lys-1')!} {...english} />)

    expect(tenses().getByRole('radio', { name: 'Past' })).toBeSelected()
    expect(tenses().queryByRole('radio', { name: 'Present' })).toBeNull()
    expect(screen.queryByRole('switch')).toBeNull()
  })

  test.each([
    ['lys-1', ['Past']],
    ['zyl-1', ['Past', 'Present', 'Future']],
    ['ktb-1', ['Past', 'Present', 'Future', 'Imperative']],
  ])('%s offers only its available tenses in the segmented control', async (verbId, labels) => {
    await render(<VerbDetail verb={getVerbById(verbId)!} {...english} />)

    expect(
      tenses()
        .getAllByRole('radio')
        .map((radio) => radio.props.accessibilityLabel),
    ).toEqual(labels)
  })

  test('omits unavailable nominal forms', async () => {
    await render(<VerbDetail verb={getVerbById('lys-1')!} {...english} />)

    expect(screen.getByText('Form')).toBeTruthy()
    expect(screen.queryByText('Nominals')).toBeNull()
    expect(screen.queryByText('Verbal noun')).toBeNull()
    expect(screen.queryByText('Active participle')).toBeNull()
  })

  test('renders masdars and participles with nominal explanations when available', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    expect(screen.getByText('Nominals')).toBeTruthy()
    expect(screen.getByText('Verbal nouns')).toBeTruthy()
    expect(screen.getByText('Active participle')).toBeTruthy()
    expect(screen.getByText('Passive participle')).toBeTruthy()
    expect(screen.getAllByTestId('nominal-form')).toHaveLength(3)
    expect(screen.getAllByRole('radiogroup')).toHaveLength(1)
  })

  test('shows localized valency, including multiple readings in numeric order', async () => {
    const { rerender } = await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)
    expect(screen.getByTestId('verb-valency').props.children).toBe('Transitive · Ditransitive')

    await rerender(<VerbDetail verb={getVerbById("'kl-1")!} {...english} />)
    expect(screen.getByTestId('verb-valency').props.children).toBe('Intransitive · Transitive')

    await rerender(<VerbDetail verb={getVerbById('sfr-1')!} {...english} />)
    expect(screen.queryByTestId('verb-valency')).toBeNull()
  })

  test('long-pressing a conjugation shows the system edit menu to copy or speak it', async () => {
    const presentEditMenu = jest.mocked(EditMenu.presentEditMenu)
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)
    const row = screen.getAllByTestId('conjugation-form')[0]

    presentEditMenu.mockResolvedValueOnce(0)
    await act(async () => await fireEvent(row, 'longPress', { nativeEvent: { pageX: 120, pageY: 300 } }))
    expect(presentEditMenu).toHaveBeenCalledWith({ x: 120, y: 300 }, ['Copy', 'Look Up', 'Translate', 'Speak'])
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith('كَتَبْتُ')

    presentEditMenu.mockResolvedValueOnce(1)
    await act(async () => await fireEvent(row, 'longPress', { nativeEvent: { pageX: 120, pageY: 300 } }))
    expect(EditMenu.lookUp).toHaveBeenCalledWith('كَتَبْتُ')

    presentEditMenu.mockResolvedValueOnce(2)
    await act(async () => await fireEvent(row, 'longPress', { nativeEvent: { pageX: 120, pageY: 300 } }))
    expect(EditMenu.translate).toHaveBeenCalledWith('كَتَبْتُ')

    presentEditMenu.mockResolvedValueOnce(3)
    await act(async () => await fireEvent(row, 'longPress', { nativeEvent: { pageX: 120, pageY: 300 } }))
    expect(arabicSpeechOutput.speakArabic).toHaveBeenCalledWith('كَتَبْتُ', { rate: 0.7 })
  })

  test('titles the conjugation sheet with the conjugated verb and shows root letters separately', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)
    await fireEvent.press(screen.getAllByTestId('conjugation-form')[0])

    expect(screen.getByRole('header', { name: 'كَتَبْتُ' })).toBeTruthy()
    expect(within(screen.getByLabelText('Explanation details')).getByText('ك ت ب')).toBeTruthy()
  })

  test('shows the complete formatted explanation and derivation', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)
    const row = screen.getAllByTestId('conjugation-form')[0]
    await fireEvent.press(row)

    expect(screen.getByLabelText('Explanation details')).toBeTruthy()
    expect(screen.getByText(/A fatḥa in the past usually means/)).toBeTruthy()
    expect(screen.queryByText(/<span|<\/span>/)).toBeNull()
    expect(screen.queryByLabelText('Derivation color key')).toBeNull()
    expect(screen.queryByRole('button', { name: 'Show more explanation' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Close explanation' })).toBeNull()
  })

  test('opens root insights from the verb metadata', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    await fireEvent.press(screen.getByRole('button', { name: 'Root insights' }))
    const drawer = screen.getByLabelText('Explanation details')
    expect(within(drawer).getAllByLabelText(/^Root radical /)).toHaveLength(3)
    expect(within(drawer).getByText(/writing/)).toBeTruthy()
    expect(within(drawer).getByText(/strong root with all radicals being consonants/)).toBeTruthy()
    expect(within(drawer).getByTestId('root-form-ktb-3')).toBeTruthy()
    expect(within(drawer).getByTestId('root-form-ktb-6')).toBeTruthy()
  })

  test('shows root forms with the lemma, form, Form I vowel pattern, and gloss', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)
    await fireEvent.press(screen.getByRole('button', { name: 'Root insights' }))

    expect(screen.getByTestId('root-form-ktb-1').props.accessibilityLabel).toBe('كَتَبَ, Form I, ◌َ / ◌ُ, to write')
    expect(screen.getByTestId('root-form-ktb-3').props.accessibilityLabel).toBe('كَاتَبَ, Form III, to correspond')
  })

  test('links to other forms of the root at the bottom of the verb screen', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    const related = screen.getByTestId('related-forms')
    expect(within(related).getByText('Derived forms')).toBeTruthy()
    const link = within(related).getByTestId('related-form-ktb-3')
    expect(within(related).queryByTestId('related-form-ktb-1')).toBeNull()

    await fireEvent.press(link)
    expect(english.onOpenVerb).toHaveBeenCalledWith(getVerbById('ktb-3'))
  })

  test('opens the form semantic explanation from the verb metadata', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    await fireEvent.press(screen.getByRole('button', { name: 'Form insights' }))
    expect(screen.getByLabelText('Explanation details')).toBeTruthy()
    expect(screen.getByText('Base meaning · Action')).toBeTruthy()
  })

  test('shows complete formatted nominal explanations', async () => {
    await render(<VerbDetail verb={getVerbById('ktb-1')!} {...english} />)

    await fireEvent.press(screen.getByRole('button', { name: 'Show explanation for Verbal nouns' }))
    expect(screen.getByText(/In Form I, the masdar is lexical/)).toBeTruthy()
    expect(screen.queryByText(/<span|<\/span>/)).toBeNull()
  })

  test('separates multiple verbal nouns with Arabic commas in their insights', async () => {
    await render(<VerbDetail verb={getVerbById('wEd-1')!} {...english} />)

    await fireEvent.press(screen.getByRole('button', { name: 'Show explanation for Verbal nouns' }))
    expect(within(screen.getByLabelText('Explanation details')).getAllByText('،')).toHaveLength(3)
  })

  test('related Kāna and Ẓanna sisters open their canonical verb detail', async () => {
    await render(<VerbDetail verb={getVerbById('kwn-1')!} {...english} />)
    await fireEvent.press(screen.getByRole('button', { name: /kwn-1/ }))
    expect(english.onOpenVerb).toHaveBeenCalledWith(expect.objectContaining({ id: 'kwn-1' }))
  })

  test('renders the Ẓanna sisters group for matching verbs', async () => {
    await render(<VerbDetail verb={getVerbById('Znn-1')!} {...english} />)
    expect(screen.getByText('Ẓanna and her sisters')).toBeTruthy()
  })
})
