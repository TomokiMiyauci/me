import React, { FC, MouseEventHandler } from 'react'
import { Icon, IconifyIcon } from '@iconify/react/dist/offline'

const Tag: FC<{
  tag: IconifyIcon
  label?: string
  hancleClick?: MouseEventHandler
  className?: string
  shrink?: boolean
}> = ({ tag, hancleClick, className, label }) => {
  return (
    <span
      onClick={hancleClick}
      className={`rounded-md  p-1  inline-flex transition duration-300 items-center dark:bg-blue-gray-800 dark:group-hover:bg-blue-gray-700 border dark:border-blue-gray-700 bg-gray-100  space-x-2 ${className}`}
    >
      <Icon className="w-7 h-7 text-accent rounded" icon={tag} />

      {label && (
        <span className="lowercase hidden md:inline dark:text-gray-200">
          {label}
        </span>
      )}
    </span>
  )
}

export default Tag
