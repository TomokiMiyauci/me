import TheHeader from '@/components/TheHeader'
import BottomNavigation from '@/components/BottomNavigation'
import { useInitializerFirestore } from '@/hooks/firebase/firestore'
import { useFirebaseApp } from '@/hooks/firebase/app'

import type { FC, ReactNode } from 'react'
import type { Locale } from 'config/types'

const Chat: FC<{
  children: ReactNode
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ children, originalPath, currentPath, locale }) => {
  const app = useFirebaseApp()
  useInitializerFirestore(app)

  return (
    <>
      <TheHeader
        originalPath={originalPath}
        currentPath={currentPath}
        locale={locale}
      />
      <main className="main overflow-x-hidden overflow-y-scroll w-screen">
        {children}
      </main>

      <BottomNavigation
        className="md:hidden"
        currentPath={currentPath}
        locale={locale}
      />
    </>
  )
}

export default Chat
