import { describe, expect, test } from 'vitest'
import { buildVerbFromId } from '../../src/paradigms/verbs'
import { fetchElixirFmParadigms, getElixirFormKey, parseInflectedVerbHtml, parseResolvedVerbHtml } from './elixirfm.mts'

const RESOLVE_HTML = `
<table cellspacing="0" class="lexeme">
  <tr>
    <td class="xtag" title="verb">V</td>
    <td class="phon" title="citation form">katab</td>
    <td class="orth" title="citation form">كَتَبَ</td>
    <td class="morphs" title="morphs of citation form">FaCaL</td>
    <td class="class" title="derivational class">I</td>
    <td class="reflex" title="lexical reference">"write"</td>
    <td class="button"><a href="index.fcgi?mode=inflect&amp;clip=(111,2)" title="inflect this lexeme">Inflect</a></td>
  </tr>
</table>
<table cellspacing="0" class="lexeme">
  <tr>
    <td class="xtag" title="noun">N</td>
    <td class="phon" title="citation form">kitaab</td>
    <td class="orth" title="citation form">كِتَاب</td>
    <td class="morphs" title="morphs of citation form">FiCāL</td>
    <td class="class" title="derivational class">I</td>
    <td class="reflex" title="lexical reference">"book"</td>
    <td class="button"><a href="index.fcgi?mode=lookup&amp;clip=(222,1)" title="lookup in the lexicon">Lookup</a></td>
  </tr>
</table>
<table cellspacing="0" class="lexeme">
  <tr>
    <td class="xtag" title="verb">V</td>
    <td class="phon" title="citation form">tadahraj</td>
    <td class="orth" title="citation form">تَدَحْرَجَ</td>
    <td class="morphs" title="morphs of citation form">TaKaRDaS</td>
    <td class="class" title="derivational class">Vq</td>
    <td class="reflex" title="lexical reference">"roll"</td>
    <td class="button"><a href="index.fcgi?mode=inflect&amp;clip=(333,4)" title="inflect this lexeme">Inflect</a></td>
  </tr>
</table>
`

const INFLECT_HTML = `
<table cellspacing="0">
  <tr><td class="xtag" title="perfective verb, active voice, first person, masculine gender, singular number">VP-A-1MS--</td><td class="orth" title="inflected form">كَتَبْتُ</td></tr>
  <tr><td class="xtag" title="perfective verb, active voice, second person, masculine gender, singular number">VP-A-2MS--</td><td class="orth" title="inflected form">كَتَبْتَ</td></tr>
  <tr><td class="xtag" title="perfective verb, active voice, third person, masculine gender, singular number">VP-A-3MS--</td><td class="orth" title="inflected form">كَتَبَ</td></tr>
  <tr><td class="xtag" title="imperfective verb, active voice, first person, masculine gender, singular number">VIIA-1MS--</td><td class="orth" title="inflected form">أَكْتُبُ</td></tr>
  <tr><td class="xtag" title="imperfective verb, active voice, second person, masculine gender, singular number">VIIA-2MS--</td><td class="orth" title="inflected form">تَكْتُبُ</td></tr>
  <tr><td class="xtag" title="imperfective verb, active voice, third person, masculine gender, singular number">VIIA-3MS--</td><td class="orth" title="inflected form">يَكْتُبُ</td></tr>
  <tr><td class="xtag" title="imperative verb, jussive mood, masculine gender, singular number">VCJ---MS--</td><td class="orth" title="inflected form">اُكْتُبْ</td></tr>
  <tr><td class="xtag" title="imperative verb, jussive mood, feminine gender, singular number">VCJ---FS--</td><td class="orth" title="inflected form">اُكْتُبِي</td></tr>
  <tr><td class="xtag" title="imperative verb, jussive mood, masculine gender, dual number">VCJ---MD--</td><td class="orth" title="inflected form">اُكْتُبَا</td></tr>
  <tr><td class="xtag" title="perfective verb, passive voice, third person, masculine gender, singular number">VP-P-3MS--</td><td class="orth" title="inflected form">كُتِبَ</td></tr>
</table>
`

const DERIVE_HTML = `
<table cellspacing="0">
  <tr><td class="xtag" title="verb">V---------</td><td class="class" title="derivational class">I</td><td class="phon" title="derived form">katab</td><td class="orth" title="derived form">كَتَبَ</td><td class="morphs" title="morphs of derived form">FaCaL</td><td class="dtag" title="grammatical parameters">verb</td></tr>
  <tr><td class="xtag" title="noun">N---------</td><td class="class" title="derivational class">I</td><td class="phon" title="derived form">kitaabat</td><td class="orth" title="derived form">كِتَابَة</td><td class="morphs" title="morphs of derived form">FiCāL-at</td><td class="dtag" title="grammatical parameters">noun</td></tr>
  <tr><td class="xtag" title="adjective, active voice">A--A------</td><td class="class" title="derivational class">I</td><td class="phon" title="derived form">kaatib</td><td class="orth" title="derived form">كَاتِب</td><td class="morphs" title="morphs of derived form">FāCiL</td><td class="dtag" title="grammatical parameters">adjective, active</td></tr>
  <tr><td class="xtag" title="adjective, passive voice">A--P------</td><td class="class" title="derivational class">I</td><td class="phon" title="derived form">maktuub</td><td class="orth" title="derived form">مَكْتُوب</td><td class="morphs" title="morphs of derived form">maFCūL</td><td class="dtag" title="grammatical parameters">adjective, passive</td></tr>
</table>
`

describe('parseResolvedVerbHtml', () => {
  test('extracts verb entries keyed by ElixirFM class labels', () => {
    expect(parseResolvedVerbHtml(RESOLVE_HTML)).toEqual(
      new Map([
        ['I', ['111', '2']],
        ['Vq', ['333', '4']],
      ]),
    )
  })
})

describe('parseInflectedVerbHtml', () => {
  test('converts ElixirFM inflection and derivation rows to ParsedParadigms', () => {
    expect(parseInflectedVerbHtml(INFLECT_HTML, DERIVE_HTML)).toEqual({
      paradigms: {
        'active past': {
          '1s': 'كَتَبْتُ',
          '2ms': 'كَتَبْتَ',
          '3ms': 'كَتَبَ',
        },
        'active present indicative': {
          '1s': 'أَكْتُبُ',
          '2ms': 'تَكْتُبُ',
          '3ms': 'يَكْتُبُ',
        },
        'active imperative': {
          '2ms': 'اُكْتُبْ',
          '2fs': 'اُكْتُبِي',
          '2d': 'اُكْتُبَا',
        },
        'passive past': {
          '3ms': 'كُتِبَ',
        },
      },
      nominals: {
        activeParticiple: 'كَاتِب',
        masdar: ['كِتَابَة'],
        passiveParticiple: 'مَكْتُوب',
      },
    })
  })
})

describe('getElixirFormKey', () => {
  test('appends q for quadrilateral forms', () => {
    expect(getElixirFormKey(buildVerbFromId('dHrj-5'))).toBe('Vq')
  })
})

describe('fetchElixirFmParadigms', () => {
  test('uses the resolved entry matching the verb form key', async () => {
    const paradigms = await fetchElixirFmParadigms(buildVerbFromId('ktb-1'), {
      deriveHtml: async (lexemeId, entryNum) => {
        expect([lexemeId, entryNum]).toEqual(['111', '2'])
        return DERIVE_HTML
      },
      inflectHtml: async (lexemeId, entryNum) => {
        expect([lexemeId, entryNum]).toEqual(['111', '2'])
        return INFLECT_HTML
      },
      resolveHtml: async (lemma) => {
        expect(lemma).toBe('كَتَبَ')
        return RESOLVE_HTML
      },
    })

    expect(paradigms.nominals.masdar).toEqual(['كِتَابَة'])
    expect(paradigms.paradigms['active past']).toMatchObject({
      '1s': 'كَتَبْتُ',
      '3ms': 'كَتَبَ',
    })
  })
})
