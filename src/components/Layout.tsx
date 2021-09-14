import AppFrame from '@/components/AppFrame'
import { useAnalytics } from '@/hooks/firebase/analytics'
import { useAuth } from '@/hooks/auth'
import { useAsyncEffect } from 'use-async-effect'
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
  const analytics = useAnalytics()
  const [{ uid }] = useAuth()

  useAsyncEffect(async () => {
    if (!analytics || !uid) return

    const { setUserId } = await import('firebase/analytics')
    setUserId(analytics, uid)
  }, [analytics, uid])

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
