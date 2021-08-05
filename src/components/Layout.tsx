import React, { FC } from 'react'
import AppFrame from './AppFrame'
import MDXProvider from '../components/MdxProvider'
import Snackbar from '../components/Snackbar'
import { useAuthProvider } from '../hooks/auth'
import AuthContext from '../contexts/auth'
import type { Locale } from '@/../config/types'
import Search from '@/components/Search'

const Layout: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ children, currentPath, originalPath, locale }) => {
  const auth = useAuthProvider()
  return (
    <AuthContext.Provider value={auth}>
      <main className="p-4 min-h-[90vh] mt-14 md:mt-24">
        <MDXProvider>{children}</MDXProvider>
      </main>

      <AppFrame
        locale={locale}
        currentPath={currentPath}
        originalPath={originalPath}
      />
      <Search />

      <Snackbar />
    </AuthContext.Provider>
  )
}

export default Layout
