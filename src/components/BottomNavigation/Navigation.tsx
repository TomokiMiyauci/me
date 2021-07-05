import React, { FC, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'gatsby'
import { test } from 'core-fn'
import { Navi } from './constants'

const endsWithPosts = test(/\/posts\/.*$/)

const Navigation: FC<{
  className?: string
  navigations: Navi[]
  currentPath: string
}> = ({ navigations, currentPath, className }) => {
  const isActive = (path: string): boolean =>
    useMemo(
      () =>
        currentPath === path ||
        (endsWithPosts(path) && endsWithPosts(currentPath)),
      []
    )

  return (
    <nav
      className={`px-2 dark:bg-blue-gray-900 bg-gray-50 dark:border-blue-gray-800 ${className}`}
    >
      <ul className="flex text-gray-500 dark:text-gray-400 justify-around items-center">
        {navigations.map(({ title, to, icon }) => (
          <li key={to} className="w-full">
            <Link
              to={to}
              className={`flex py-2 hover:opacity-70 duration-300 transition-opacity flex-col justify-center items-center ${
                isActive(to)
                  ? 'text-accent bg-gray-100 dark:bg-blue-gray-800'
                  : ''
              }`}
            >
              <Icon className="w-7 h-7" icon={icon} />
              <span className=" text-[0.65rem]">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
