import React, { FC, memo } from 'react'
import { useLocalizedNavigations } from './hooks'
import type { Locale } from '@/../config/types'

import Navigation from './Navigation'

const BottomNavigation: FC<{
  className?: string
  currentPath: string
  locale: Locale
}> = ({ currentPath, className, locale }) => {
  return (
    <div
      className={`bg-gray-50
    dark:bg-blue-gray-900
    backdrop-blur-md
    dark:border-gray-800
    fixed bottom-0 inset-x-0 w-full border-t ${className}
  `}
      style={{ '--tw-bg-opacity': '0.7' }}
    >
      <Memo locale={locale} currentPath={currentPath} />
    </div>
  )
}

const Nav: FC<{ currentPath: string; locale: Locale }> = ({
  currentPath,
  locale
}) => {
  const localizedNavs = useLocalizedNavigations(locale)

  return <Navigation navigations={localizedNavs} currentPath={currentPath} />
}

const Memo = memo(Nav)

export default BottomNavigation
