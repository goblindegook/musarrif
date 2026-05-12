import { styled } from 'goober'
import { useMemo } from 'preact/hooks'
import { getClosestVerbs, getRandomVerbs } from '../../paradigms/selection'
import type { DisplayVerb } from '../../paradigms/verbs'
import { VerbPill } from './VerbPill'

interface QuickPickListProps {
  selectedVerb?: DisplayVerb | null
}

export function QuickPickList({ selectedVerb }: QuickPickListProps) {
  const picks = useMemo(
    () =>
      selectedVerb
        ? getClosestVerbs(selectedVerb.root, 10)
            .filter(({ id }) => id !== selectedVerb.id)
            .slice(0, 5)
        : getRandomVerbs(5),
    [selectedVerb],
  )

  if (picks.length === 0) return null

  return (
    <SuggestionsList>
      {picks.map((verb) => (
        <VerbPill key={verb.id} verb={verb} />
      ))}
    </SuggestionsList>
  )
}

export const SuggestionsList = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
