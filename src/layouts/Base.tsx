import AppFrame from '@/components/AppFrame'

import type { FC } from 'react'
import type { Locale } from 'config/types'

const Layout: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ children, currentPath, originalPath, locale }) => {
  return (
    <>
      <main className="p-4 min-h-[90vh] mt-[56px] md:mt-[84px]">
        {children}
      </main>
      <AppFrame
        locale={locale}
        currentPath={currentPath}
        originalPath={originalPath}
      />
    </>
  )
}

export default Layout
