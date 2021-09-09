import AppFrame from '@/components/AppFrame'
import { useFirebase } from '@/hooks/firebase'
import { useEffect } from 'react'
import loadable from '@loadable/component'

const Notice = loadable(() => import('@/components/Notice'))
const Search = loadable(() => import('@/components/Search'))

import type { FC } from 'react'
import type { Locale } from 'config/types'

const Layout: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ children, currentPath, originalPath, locale }) => {
  const [{ uid, analytics }] = useFirebase()

  useEffect(() => {
    if (!analytics) return
    import('firebase/analytics').then(({ setUserId }) => {
      setUserId(analytics, uid!)
    })
  }, [analytics])
  return (
    <>
      <main className="p-4 min-h-[90vh] mt-14 md:mt-[5.5rem]">{children}</main>
      <AppFrame
        locale={locale}
        currentPath={currentPath}
        originalPath={originalPath}
      />

      <Search locale={locale} />
      <Notice />
    </>
  )
}

export default Layout
