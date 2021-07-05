import React, { FC, useMemo } from 'react'
import { Icon } from '@iconify/react'
import blogicon from '@iconify-icons/carbon/blog'
import accountIcon from '@iconify-icons/mdi/account-outline'
import camera from '@iconify-icons/mdi/camera'
import { Link } from 'gatsby'
import { useLocalization } from 'gatsby-theme-i18n'
import { test } from 'core-fn'

const endsWithPosts = test(/\/posts\/.*$/)

type Navigation = {
  title: string
  to: string
  icon: object
}

const navigations: Navigation[] = [
  { title: 'About', to: '/', icon: accountIcon },
  { title: 'Blog', to: '/posts/', icon: blogicon },
  { title: 'Photo', to: '/photos/', icon: camera }
]

const PureNavigation: FC<{
  className?: string
  navigations: Navigation[]
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

const BottomNavigation: FC<{ className?: string; currentPath: string }> = ({
  currentPath,
  className
}) => {
  const { localizedPath, ...rest } = useLocalization()
  const localizedNavs = useMemo(
    () =>
      navigations.map(({ title, to, icon }) => ({
        title,
        icon,
        to: localizedPath({ ...rest, path: to })
      })),
    []
  )

  return (
    <PureNavigation
      className={`fixed bottom-0 inset-x-0 w-full border-t ${className}`}
      navigations={localizedNavs}
      currentPath={currentPath}
    />
  )
}

export default BottomNavigation
export { PureNavigation, navigations }
