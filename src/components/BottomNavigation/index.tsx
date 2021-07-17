import React, { FC, memo } from 'react'
import { useLocalizedNavigations } from './hooks'

import Navigation from './Navigation'

const BottomNavigation: FC<{ className?: string; currentPath: string }> = ({
  currentPath,
  className
}) => {
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
      <Memo currentPath={currentPath} />
    </div>
  )
}

const Nav: FC<{ currentPath: string }> = ({ currentPath }) => {
  const localizedNavs = useLocalizedNavigations()

  return <Navigation navigations={localizedNavs} currentPath={currentPath} />
}

const Memo = memo(Nav)

export default BottomNavigation
