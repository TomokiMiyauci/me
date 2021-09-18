import { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import magnify from '@iconify-icons/mdi/magnify'
import { classNames } from '@/utils/class_name'

const SearchButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, ...props }) => {
  return (
    <button
      aria-label="Show search dialog"
      className={classNames('text-accent', className)}
      {...props}
    >
      <Icon icon={magnify} className="w-8 h-8" />
    </button>
  )
}

export default SearchButton
