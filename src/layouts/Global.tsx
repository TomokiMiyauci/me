import loadable from '@loadable/component'
const Notice = loadable(() => import('@/components/Notice'))
const Search = loadable(() => import('@/components/Search'))

import type { FC, ReactNode } from 'react'

const Global: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Notice />
      <Search />
    </>
  )
}

export default Global
