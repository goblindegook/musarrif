import { styled } from 'goober'
import type { TargetedMouseEvent } from 'preact'
import { useEffect } from 'preact/hooks'

export interface OverlayProps {
  readonly onClick?: (event: TargetedMouseEvent<HTMLDivElement>) => void
  readonly zIndex?: number
}

export function Overlay({ onClick, zIndex, ...props }: OverlayProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return (
    <OverlayBase
      zIndex={zIndex}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          // event.stopPropagation()
          onClick?.(event)
        }
      }}
      {...props}
    />
  )
}

const OverlayBase = styled('div')<{ zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ zIndex }) => zIndex};
  cursor: default;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  pointer-events: auto;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & > * {
    pointer-events: auto;
  }
`
