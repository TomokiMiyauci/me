import React, { FC } from 'react'
import { useLocalizedNavigations } from './hooks'

import Navigation from './Navigation'

const BottomNavigation: FC<{ className?: string; currentPath: string }> = ({
  currentPath,
  className
}) => {
  const localizedNavs = useLocalizedNavigations()

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
      <Navigation navigations={localizedNavs} currentPath={currentPath} />
    </div>
  )
}

export default BottomNavigation
