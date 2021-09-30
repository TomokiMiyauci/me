import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import type { FC } from 'react'

const ButtonAccentColor: FC<JSX.IntrinsicElements['button']> = (props) => {
  return (
    <button
      aria-label="Show accent color palette"
      className="flex btn-circle transition-colors duration-300"
      {...props}
    >
      <IconSkeltonLoader
        className="w-8 h-8"
        iconClassName="text-accent"
        icon={() => import('@iconify-icons/mdi/invert-colors')}
        fallbackClassName="rounded-full"
      />
    </button>
  )
}

export default ButtonAccentColor
