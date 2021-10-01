import { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { classNames } from '@/utils/class_name'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'

const SearchButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, ...props }) => {
  return (
    <button
      aria-label="Show search dialog"
      className={classNames(className)}
      {...props}
    >
      <IconSkeltonLoader
        className="w-8 h-8"
        icon={() => import('@iconify-icons/mdi/magnify')}
        fallbackClassName="rounded-full"
        iconClassName="text-accent"
      />
    </button>
  )
}

export default SearchButton
