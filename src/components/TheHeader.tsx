import { memo } from 'react'
import { useLocalizedNavigations } from './BottomNavigation/hooks'
import rss from '@iconify-icons/bi/rss'
import SearchButton from '@/components/Search/SearchButton'
import { useSearchShow } from '@/components/Search/hooks'
import Logo from '@/components/Logo'
import AccentColor from '@/components/AccentColor'
import LangSwitcher from '@/components/LangSwitcher'
import Navigation from '@/components/BottomNavigation/Navigation'
import DarkMode from '@/components/DarkMode'
import IconWith from '@/components/IconWith'
import { classNames } from '@/utils/class_name'

import type { FC } from 'react'
import type { Locale } from '@/../config/types'

const Inner: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ originalPath, currentPath, locale }) => {
  const localizedNavs = useLocalizedNavigations(locale)
  const [_, changeShow] = useSearchShow()

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
          <IconWith icon={rss} className="w-7 h-7 md:w-9 md:h-9">
            <span className="text-[0.65rem] md:text-xs">RSS</span>
          </IconWith>
        </a>
      </span>

      <div className="flex space-x-5 lg:space-x-8 items-center">
        <span className="tooltip" data-tooltip="Search">
          <SearchButton onClick={() => changeShow(true)} />
        </span>

        <LangSwitcher originalPath={originalPath} />

        <AccentColor />

        <span className="tooltip w-[32px] h-[32px]" data-tooltip="Dark mode">
          <DarkMode />
        </span>
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
