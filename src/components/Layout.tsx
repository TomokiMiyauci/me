import React, { FC } from 'react'
import { useAuthProvider } from '@/hooks/auth'
import AuthContext from '@/contexts/auth'
import type { Locale } from '@/../config/types'
import Search from '@/components/Search'

import loadable from '@loadable/component'
const Snackbar = loadable(() => import('@/components/Snackbar'))
const AppFrame = loadable(() => import('@/components/AppFrame'))
const Layout: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ children, currentPath, originalPath, locale }) => {
  const auth = useAuthProvider()
  return (
    <AuthContext.Provider value={auth}>
      <main className="p-4 min-h-[90vh] mt-14 md:mt-[5.5rem]">{children}</main>

      <AppFrame
        locale={locale}
        currentPath={currentPath}
        originalPath={originalPath}
      />
      {/* <Search /> */}

      <Snackbar />
    </AuthContext.Provider>
  )
}

export default Layout
