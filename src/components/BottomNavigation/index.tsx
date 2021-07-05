import React, { FC, useMemo } from 'react'
import { useLocalization } from 'gatsby-theme-i18n'
import { navigations } from './constants'

import Navigation from './Navigation'

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
    <Navigation
      className={`fixed bottom-0 inset-x-0 w-full border-t ${className}`}
      navigations={localizedNavs}
      currentPath={currentPath}
    />
  )
}

export default BottomNavigation
