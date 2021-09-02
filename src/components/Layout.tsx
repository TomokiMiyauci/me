import { FC } from 'react'
import Snackbar from '@/components/Notice'
import AppFrame from '@/components/AppFrame'
import type { Locale } from '@/../config/types'
import { useFirebase } from '@/hooks/firebase'
import { useEffect } from 'react'

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
      {/* <Search /> */}

      <Snackbar />
    </>
  )
}

export default Layout
