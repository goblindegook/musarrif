import { useI18n } from '../hooks/i18n'
import { IconButton } from './IconButton'
import { HeartIcon } from './icons/HeartIcon'
import { HeartOutlineIcon } from './icons/HeartOutlineIcon'

interface FavouriteButtonProps {
  isFavourite: boolean
  onToggle: () => void
}

export function FavouriteButton({ isFavourite, onToggle }: FavouriteButtonProps) {
  const { t } = useI18n()
  const ariaLabel = isFavourite ? t('aria.favourite.remove') : t('aria.favourite.add')

  return (
    <IconButton onClick={onToggle} ariaLabel={ariaLabel} active={isFavourite}>
      {isFavourite ? <HeartIcon /> : <HeartOutlineIcon />}
    </IconButton>
  )
}
