import AppFrame from '@/components/AppFrame'
import loadable from '@loadable/component'

const Search = loadable(() => import('@/components/Search'))

import type { FC } from 'react'
import type { Locale } from 'config/types'

const Layout: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ children, currentPath, originalPath, locale }) => {
  return (
    <>
      <main className="p-4 min-h-[90vh] mt-14 md:mt-[5.5rem]">{children}</main>
      <AppFrame
        locale={locale}
        currentPath={currentPath}
        originalPath={originalPath}
      />

      <Search locale={locale} />
    </>
  )
}

export default Layout
