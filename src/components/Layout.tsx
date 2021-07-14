import React, { FC, ReactChildren } from 'react'
import AppFrame from './AppFrame'
import MDXProvider from '../components/MdxProvider'
import DarkModeContext from '../components/DarkMode/Context'
import useDarkMode from 'use-dark-mode'
import Snackbar from '../components/Snackbar'
import SnackbarContext, { useNotice } from '../components/Snackbar/Context'

const Layout: FC<{
  children: ReactChildren
  originalPath: string
  currentPath: string
}> = ({ children, currentPath, originalPath }) => {
  const { value, toggle } = useDarkMode(undefined, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

  const [state, notice] = useNotice()

  return (
    <SnackbarContext.Provider value={[state, notice]}>
      <DarkModeContext.Provider value={[value, toggle]}>
        <main className="p-4 mt-14 md:mt-24">
          <MDXProvider>{children}</MDXProvider>
        </main>

        <AppFrame currentPath={currentPath} originalPath={originalPath} />
        <Snackbar />
      </DarkModeContext.Provider>
    </SnackbarContext.Provider>
  )
}

export default Layout
