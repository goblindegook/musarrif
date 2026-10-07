import type { ComponentProps } from 'react'
import { getCopy } from '../../i18n/copy'
import type { ExerciseSession } from './ExerciseSession'

type Props = ComponentProps<typeof ExerciseSession>

export function sessionProps(overrides: Pick<Props, 'exercise'> & Partial<Props>): Props {
  const { t } = getCopy('en')
  const translate = overrides.translate ?? t
  return {
    srsStore: {},
    onPersistAnswer: jest.fn(),
    onNext: jest.fn(),
    translate,
    translatePrompt: translate,
    ...overrides,
  }
}
