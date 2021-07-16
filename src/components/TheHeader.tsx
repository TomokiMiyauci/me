import React, { FC, memo } from 'react'
import Logo from '@/components/Logo'
import AccentColor from '@/components/AccentColor'
import DarkMode from '@/components/DarkMode'
import LangSwitcher from '@/components/LangSwitcher'
import Navigation from '@/components/BottomNavigation/Navigation'
import { useLocalizedNavigations } from '@/components/BottomNavigation/hooks'

const Inner: FC<{
  originalPath: string
  currentPath: string
}> = ({ originalPath, currentPath }) => {
  const localizedNavs = useLocalizedNavigations()

  return (
    <div
      className="container max-w-8xl py-2 md:py-0 px-3 mx-auto items-center
justify-between flex"
    >
      <span className="flex space-x-6 items-center">
        <Logo shrink />

        <Navigation
          className="hidden md:block"
          navigations={localizedNavs}
          currentPath={currentPath}
        />
      </span>

      <div className="flex space-x-5 md:space-x-8 items-center">
        {/* <Search indices={indices} /> */}

        <LangSwitcher originalPath={originalPath} />

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
}> = ({ originalPath, className, currentPath }) => {
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
      <MemoInner currentPath={currentPath} originalPath={originalPath} />
    </header>
  )
}

export default TheHeader
