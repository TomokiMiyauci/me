import loadable from '@loadable/component'
const Notice = loadable(() => import('@/components/Notice'))
const Search = loadable(() => import('@/components/Search'))

import type { FC, ReactNode } from 'react'
import type { Locale } from 'config/types'

const Global: FC<{ children: ReactNode; locale: Locale }> = ({
  children,
  locale
}) => {
  return (
    <>
      {children}
      <Notice />
      <Search locale={locale} />
    </>
  )
}

export default Global
