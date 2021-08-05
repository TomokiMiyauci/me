import React, { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import magnify from '@iconify-icons/mdi/magnify'

const SearchButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, ...props }) => {
  return (
    <button className={`text-accent ${className}`} {...props}>
      <Icon icon={magnify} className="w-8 h-8" />
    </button>
  )
}

export default SearchButton
