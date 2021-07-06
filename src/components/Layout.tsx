import React, { FC, ReactChildren } from 'react'
import AppFrame from './AppFrame'
import MDXProvider from '../components/MdxProvider'

const Layout: FC<{
  children: ReactChildren
  originalPath: string
  currentPath: string
}> = ({ children, currentPath, originalPath }) => {
  return (
    <>
      <main className="p-4 mt-14 md:mt-24">
        <MDXProvider>{children}</MDXProvider>
      </main>

      <AppFrame currentPath={currentPath} originalPath={originalPath} />
    </>
  )
}

export default Layout
