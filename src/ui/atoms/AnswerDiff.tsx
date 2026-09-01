import { styled } from 'goober'
import type { AnswerSegment } from '../../exercises/answer-diff'

export function AnswerDiff({ segments }: { segments: readonly AnswerSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => (
        <Segment key={`s-${index}`} data-mark={segment.mark}>
          {segment.text}
        </Segment>
      ))}
    </>
  )
}

const Segment = styled('span')`
  &[data-mark='error'] {
    color: var(--color-error-text);
    text-decoration: underline wavy;
    text-underline-offset: 0.25em;
  }

  &[data-mark='missing'] {
    color: var(--color-warning-text);
    text-decoration: underline dotted;
    text-underline-offset: 0.25em;
  }
`
