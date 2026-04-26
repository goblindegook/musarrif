import { css, styled } from 'goober'
import { useRef, useState } from 'preact/hooks'
import { useI18n } from '../../hooks/useI18n'
import { IconButton } from '../atoms/IconButton'
import { HeartIcon } from '../icons/HeartIcon'
import { HeartOutlineIcon } from '../icons/HeartOutlineIcon'

interface FavouriteButtonProps {
  isFavourite: boolean
  onToggle: () => void
}

type AnimState = 'idle' | 'pop' | 'shrink'

const heartAnimations = css`
  @keyframes heart-pop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.35); }
    70%  { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
  @keyframes heart-shrink {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.7); }
    100% { transform: scale(1); }
  }
`

const AnimatedHeart = styled('span')<{ animState: AnimState }>`
  display: contents;

  svg {
    animation: ${({ animState }) =>
      animState === 'pop'
        ? 'heart-pop 320ms cubic-bezier(0.25, 1, 0.5, 1) forwards'
        : animState === 'shrink'
          ? 'heart-shrink 240ms cubic-bezier(0.25, 1, 0.5, 1) forwards'
          : 'none'};

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`

export function FavouriteButton({ isFavourite, onToggle }: FavouriteButtonProps) {
  const { t } = useI18n()
  const [animState, setAnimState] = useState<AnimState>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ariaLabel = isFavourite ? t('aria.favourite.remove') : t('aria.favourite.add')

  const handleToggle = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setAnimState(isFavourite ? 'shrink' : 'pop')
    timerRef.current = setTimeout(() => setAnimState('idle'), 400)
    onToggle()
  }

  return (
    <IconButton onClick={handleToggle} aria-label={ariaLabel} active={isFavourite}>
      <AnimatedHeart animState={animState} class={heartAnimations}>
        {isFavourite ? <HeartIcon /> : <HeartOutlineIcon />}
      </AnimatedHeart>
    </IconButton>
  )
}
