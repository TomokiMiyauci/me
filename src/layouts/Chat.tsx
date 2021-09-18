import TheHeader from '@/components/TheHeader'
import BottomNavigation from '@/components/BottomNavigation'
import { useStep } from '@/components/Chat/hooks'
import { useInitializeFirestore } from '@/hooks/firebase/firestore'
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
  useInitializeFirestore(app)

  const step = useStep()
  return (
    <>
      <TheHeader
        originalPath={originalPath}
        currentPath={currentPath}
        locale={locale}
      />
      {step === 'AUTHED' ? (
        <main className="main overflow-x-hidden overflow-y-scroll w-screen">
          {children}
        </main>
      ) : (
        <main>Loading</main>
      )}

      <BottomNavigation
        className="md:hidden"
        currentPath={currentPath}
        locale={locale}
      />
    </>
  )
}

export default Chat
