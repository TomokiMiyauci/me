import React, { FC } from 'react'
import robotIcon from '@iconify-icons/mdi/robot'
import sourcePull from '@iconify-icons/mdi/source-pull'
import { Icon } from '@iconify/react/dist/offline'

const Index: FC<{ href: string; className?: string }> = ({
  href,
  className
}) => {
  return (
    <div
      className={`px-2 py-1 md:py-3 border-accent md:border sm:rounded-md bg-gradient-to-r space-x-2 from-purple-400 dark:from-purple-500 via-pink-400 dark:via-pink-500  to-amber-400 dark:to-amber-500 ${className}`}
    >
      <Icon icon={robotIcon} className="w-6 h-6 md:w-7 md:h-7" />
      <span className="align-middle dark:text-gray-200">
        This article has been translated on the basis of machine translation. If
        there are any errors, please fix it.
        <a
          href={href}
          className="float-right border-accent border space-x-1 hover:no-underline no-underline bg-white dark:bg-blue-gray-900 rounded text-gray-700 dark:text-gray-50 px-2 py-1 shadow"
          target="_blank"
          rel="noopener"
        >
          <Icon icon={sourcePull} className="w-5 h-5" />
          <span>pull request</span>
        </a>
      </span>
    </div>
  )
}

export default Index
