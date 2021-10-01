import { memo } from 'react'
import { useLocalizedNavigations } from '@/components/BottomNavigation/hooks'
import Logo from '@/components/Logo/Logo'
import Navigation from '@/components/BottomNavigation/Navigation'
import { classNames } from '@/utils/class_name'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'

import Search from '@/components/Search'
import LangSwitcher from '@/components/LangSwitcher'
import AccentColor from '@/components/AccentColor'
import DarkMode from '@/components/DarkMode'

import type { FC } from 'react'
import type { Locale } from '@/../config/types'

const Inner: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ currentPath, locale }) => {
  const localizedNavs = useLocalizedNavigations(locale)

  return (
    <div
      className="container max-w-8xl mx-auto items-center
justify-between flex"
    >
      <span className="flex space-x-2 lg:space-x-6 items-center">
        <Logo shrink locale={locale} />

        <Navigation
          className="hidden md:block"
          navigations={localizedNavs}
          currentPath={currentPath}
        />

        <a
          className="hidden md:flex text-gray-500 dark:text-gray-400 p-2 md:py-4 md:px-6 hover:bg-gray-200 dark:hover:bg-blue-gray-800 hover:opacity-70 duration-300 transition flex-col justify-center items-center"
          target="_blank"
          href="/rss.xml"
        >
          <IconSkeltonLoader
            className="w-7 h-7 md:w-9 md:h-9"
            fallbackClassName="rounded"
            icon={() => import('@iconify-icons/bi/rss')}
          />
          <span className="text-[0.65rem] md:text-xs">RSS</span>
        </a>
      </span>

      <div className="flex space-x-5 lg:space-x-8 items-center">
        <Search />

        <LangSwitcher />

        <AccentColor />

        <DarkMode />
      </div>
    </div>
  )
}

const MemoInner = memo(Inner)

const TheHeader: FC<{
  originalPath: string
  className?: string
  currentPath: string
  locale: Locale
}> = ({ originalPath, className, currentPath, locale }) => {
  return (
    <header
      className={classNames(
        'h-[56px] md:h-[84px] fixed top-0 w-full py-1 md:py-0 px-3 border-b md:border-none bg-gray-50 dark:bg-blue-gray-900 backdrop-blur-md dark:border-gray-800',
        className
      )}
      style={{ '--tw-bg-opacity': '0.7' }}
    >
      <MemoInner
        locale={locale}
        currentPath={currentPath}
        originalPath={originalPath}
      />
    </header>
  )
}

export default TheHeader
