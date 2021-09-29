import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'

import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

const ButtonLangSwitcher: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <button
      aria-label="Show language list"
      className="btn-circle transition-colors duration-300"
      {...props}
    >
      <IconSkeltonLoader
        iconClassName="w-8 h-8 text-accent"
        fallbackClassName="w-10 h-10 rounded-full"
        icon={() => import('@iconify-icons/mdi/translate')}
      />
    </button>
  )
}

export default ButtonLangSwitcher
