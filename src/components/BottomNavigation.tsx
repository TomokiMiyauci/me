import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import blogicon from '@iconify-icons/carbon/blog'
import accountIcon from '@iconify-icons/mdi/account-outline'
import camera from '@iconify-icons/mdi/camera'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'

const navigations: {
  title: string
  to: string
  icon: object
}[] = [
  { title: 'About', to: '/', icon: accountIcon },
  { title: 'Blog', to: '/posts/', icon: blogicon },
  { title: 'Photo', to: '/photos/', icon: camera }
]

const BottomNavigation: FC<{ className?: string; originalPath: string }> = ({
  className,
  originalPath
}) => {
  const { locale } = useLocalization()
  const isActive = (path: string): boolean => originalPath === path

  return (
    <nav
      className={`px-2 dark:bg-blue-gray-900 bg-gray-50 border-t dark:border-blue-gray-800 fixed bottom-0 inset-x-0 w-full ${className}`}
    >
      <ul className="flex text-gray-500 dark:text-gray-400 justify-around items-center">
        {navigations.map(({ title, to, icon }) => (
          <li key={to}>
            <LocalizedLink
              to={to}
              language={locale}
              className={`flex p-2 flex-col justify-center items-center ${
                isActive(to) ? 'text-accent' : ''
              }`}
            >
              <Icon className="w-7 h-7" icon={icon} />
              <span className=" text-[0.65rem]">{title}</span>
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BottomNavigation
