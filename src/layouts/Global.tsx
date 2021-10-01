import loadable from '@loadable/component'
const Notice = loadable(() => import('@/components/Notice'))

import type { FC, ReactNode } from 'react'

const Global: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Notice />
    </>
  )
}

export default Global
