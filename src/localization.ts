import type { PronounId } from './paradigms/pronouns'
import type { RootShape } from './paradigms/roots'
import type { Mood, Tense, VerbTense, Voice } from './paradigms/tense'
import type { DiacriticsPreference } from './paradigms/tokens'
import type { Valency } from './paradigms/verb-types'

export type Translate = (key: string, params?: Record<string, string>) => string

export function localizedTense(t: Translate, tense: VerbTense): string {
  switch (tense) {
    case 'active.past':
      return t('tense.active.past')
    case 'active.present.indicative':
      return t('tense.active.present.indicative')
    case 'active.present.subjunctive':
      return t('tense.active.present.subjunctive')
    case 'active.present.jussive':
      return t('tense.active.present.jussive')
    case 'active.future':
      return t('tense.active.future')
    case 'active.imperative':
      return t('tense.active.imperative')
    case 'passive.past':
      return t('tense.passive.past')
    case 'passive.present.indicative':
      return t('tense.passive.present.indicative')
    case 'passive.present.subjunctive':
      return t('tense.passive.present.subjunctive')
    case 'passive.present.jussive':
      return t('tense.passive.present.jussive')
    case 'passive.future':
      return t('tense.passive.future')
  }
}

export function localizedPronoun(t: Translate, pronoun: PronounId, abbreviated = false): string {
  switch (pronoun) {
    case '1s':
      return abbreviated ? t('pronoun.1s.abbreviated') : t('pronoun.1s')
    case '2ms':
      return abbreviated ? t('pronoun.2ms.abbreviated') : t('pronoun.2ms')
    case '2fs':
      return abbreviated ? t('pronoun.2fs.abbreviated') : t('pronoun.2fs')
    case '3ms':
      return abbreviated ? t('pronoun.3ms.abbreviated') : t('pronoun.3ms')
    case '3fs':
      return abbreviated ? t('pronoun.3fs.abbreviated') : t('pronoun.3fs')
    case '2d':
      return abbreviated ? t('pronoun.2d.abbreviated') : t('pronoun.2d')
    case '3md':
      return abbreviated ? t('pronoun.3md.abbreviated') : t('pronoun.3md')
    case '3fd':
      return abbreviated ? t('pronoun.3fd.abbreviated') : t('pronoun.3fd')
    case '1p':
      return abbreviated ? t('pronoun.1p.abbreviated') : t('pronoun.1p')
    case '2mp':
      return abbreviated ? t('pronoun.2mp.abbreviated') : t('pronoun.2mp')
    case '2fp':
      return abbreviated ? t('pronoun.2fp.abbreviated') : t('pronoun.2fp')
    case '3mp':
      return abbreviated ? t('pronoun.3mp.abbreviated') : t('pronoun.3mp')
    case '3fp':
      return abbreviated ? t('pronoun.3fp.abbreviated') : t('pronoun.3fp')
  }
}

export function localizedVoice(t: Translate, voice: Voice): string {
  switch (voice) {
    case 'active':
      return t('voice.active')
    case 'passive':
      return t('voice.passive')
  }
}

export function localizedSimpleTense(t: Translate, tense: Tense): string {
  switch (tense) {
    case 'past':
      return t('tense.past')
    case 'present':
      return t('tense.present')
    case 'future':
      return t('tense.future')
    case 'imperative':
      return t('mood.imperative')
  }
}

export function localizedMood(t: Translate, mood: Mood): string {
  switch (mood) {
    case 'indicative':
      return t('mood.indicative')
    case 'subjunctive':
      return t('mood.subjunctive')
    case 'jussive':
      return t('mood.jussive')
  }
}

export function localizedRootShape(t: Translate, shape: RootShape): string {
  switch (shape) {
    case 'sound':
      return t('rootType.sound')
    case 'assimilated':
      return t('rootType.assimilated')
    case 'hollow':
      return t('rootType.hollow')
    case 'defective':
      return t('rootType.defective')
    case 'doubled':
      return t('rootType.doubled')
    case 'hamzated':
      return t('rootType.hamzated')
    case 'biliteral':
      return t('rootType.biliteral')
  }
}

export function localizedValency(t: Translate, valency: Valency): string {
  switch (valency) {
    case 1:
      return t('valency.1')
    case 2:
      return t('valency.2')
    case 3:
      return t('valency.3')
  }
}

export function localizedSortOrder(t: Translate, order: 'frequency' | 'alphabetical'): string {
  switch (order) {
    case 'frequency':
      return t('verbsList.sort.frequency.label')
    case 'alphabetical':
      return t('verbsList.sort.alphabetical.label')
  }
}

export function localizedDiacritics(t: Translate, option: DiacriticsPreference): string {
  switch (option) {
    case 'all':
      return t('diacritics.all')
    case 'some':
      return t('diacritics.some')
    case 'none':
      return t('diacritics.none')
  }
}

export function localizedTheme(t: Translate, option: 'light' | 'dark' | 'system'): string {
  switch (option) {
    case 'light':
      return t('theme.light')
    case 'dark':
      return t('theme.dark')
    case 'system':
      return t('theme.system')
  }
}
