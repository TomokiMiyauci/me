import React, { FC } from 'react'
import { useLocalizedNavigations } from './hooks'

import Navigation from './Navigation'

const BottomNavigation: FC<{ className?: string; currentPath: string }> = ({
  currentPath,
  className
}) => {
  const localizedNavs = useLocalizedNavigations()

  return (
    <Navigation
      className={`fixed bottom-0 inset-x-0 w-full border-t ${className}`}
      navigations={localizedNavs}
      currentPath={currentPath}
    />
  )
}

export default BottomNavigation
