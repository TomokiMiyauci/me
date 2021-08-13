import React, { FC, memo, useContext } from 'react'
import { useLocalizedNavigations } from './BottomNavigation/hooks'
import rss from '@iconify-icons/bi/rss'
import type { Locale } from '@/../config/types'
import SearchButton from '@/components/Search/SearchButton'
import { useSearchShow } from '@/components/Search/hooks'

import loadable from '@loadable/component'
const Logo = loadable(() => import('@/components/Logo'))
const AccentColor = loadable(() => import('@/components/AccentColor'))
const LangSwitcher = loadable(() => import('@/components/LangSwitcher'))
const Navigation = loadable(
  () => import('@/components/BottomNavigation/Navigation')
)
const DarkMode = loadable(() => import('@/components/DarkMode'))
const IconWith = loadable(() => import('@/components/IconWith'))

const Inner: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ originalPath, currentPath, locale }) => {
  const localizedNavs = useLocalizedNavigations(locale)
  const [_, toggleSearch] = useSearchShow()

  return (
    <>
      <div
        className="container max-w-8xl py-2 md:py-0 px-3 mx-auto items-center
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
            <IconWith icon={rss} className="w-7 h-7 md:w-9 md:h-9">
              <span className="text-[0.65rem] md:text-xs">RSS</span>
            </IconWith>
          </a>
        </span>

        <div className="flex space-x-5 lg:space-x-8 items-center">
          {/* <SearchButton className="md:hidden" onClick={toggleSearch} /> */}

          <LangSwitcher originalPath={originalPath} />

          <AccentColor />

          <DarkMode />
        </div>
      </div>
    </>
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
      className={`
      fixed
      top-0
      border-b
      md:border-none
      w-full
      bg-gray-50
      dark:bg-blue-gray-900
      backdrop-blur-md
      dark:border-gray-800 ${className}`}
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
