import TheHeader from '@/components/TheHeader'
import BottomNavigation from '@/components/BottomNavigation'
import { useStep } from '@/components/Chat/hooks'
import { useInitializeFirestore } from '@/hooks/firebase/firestore'
import { useFirebaseApp } from '@/hooks/firebase/app'

import type { FC, ReactNode } from 'react'

const Chat: FC<{
  children: ReactNode
}> = ({ children }) => {
  const app = useFirebaseApp()
  useInitializeFirestore(app)

  const step = useStep()
  return (
    <>
      <TheHeader />
      {step === 'AUTHED' ? (
        <main className="main overflow-x-hidden overflow-y-scroll w-screen">
          {children}
        </main>
      ) : (
        <main>Loading</main>
      )}

      <BottomNavigation className="md:hidden" />
    </>
  )
}

export default Chat
