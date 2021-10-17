import TheHeader from '@/components/TheHeader/TheHeader'
import BottomNavigation from '@/components/BottomNavigation'
import { useStep } from '@/components/Chat/hooks'
import { useInitializeFirestore } from '@/hooks/firebase/firestore'
import { useFirebaseApp } from '@/hooks/firebase/app'
import loadable from '@loadable/component'
import { useLayoutContext } from '@/layouts/hooks'

const Loading = loadable(() => import('@/components/Chat/Loading'))
const MustSignin = loadable(() => import('@/components/SignIn/MustSignin'))

import type { FC, ReactNode } from 'react'

const Chat: FC<{
  children: ReactNode
}> = ({ children }) => {
  const app = useFirebaseApp()
  useInitializeFirestore(app)
  const { originalPath, path, locale } = useLayoutContext()

  const step = useStep()
  return (
    <>
      <TheHeader
        originalPath={originalPath}
        currentPath={path}
        locale={locale}
      />
      {step === 'AUTHED' ? (
        <main className="main overflow-x-hidden overflow-y-scroll w-screen">
          {children}
        </main>
      ) : (
        <main className="h-screen w-screen grid place-items-center">
          {step === 'INIT' ? <Loading /> : <MustSignin />}
        </main>
      )}

      <BottomNavigation className="md:hidden" />
    </>
  )
}

export default Chat
