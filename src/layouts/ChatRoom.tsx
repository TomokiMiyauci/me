import TheHeader from '@/components/TheHeader'
import { navigate } from 'gatsby'
import { Icon } from '@iconify/react/dist/offline'
import chevronLeft from '@iconify/icons-akar-icons/chevron-left'
import { useInitializeFirestore } from '@/hooks/firebase/firestore'
import { useFirebaseApp } from '@/hooks/firebase/app'
import { useStep } from '@/components/Chat/hooks'
import loadable from '@loadable/component'

const Loading = loadable(() => import('@/components/Chat/Loading'))
const MustSignin = loadable(() => import('@/components/SignIn/MustSignin'))

import type { FC, ReactNode } from 'react'
import type { Locale } from 'config/types'

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  const step = useStep()
  return (
    <>
      {step === 'AUTHED' ? (
        <main className="main container mx-auto overflow-x-hidden overflow-y-scroll w-screen">
          {children}
        </main>
      ) : (
        <main className="h-screen w-screen grid place-items-center">
          {step === 'INIT' ? <Loading /> : <MustSignin />}
        </main>
      )}
    </>
  )
}

const ChatRoom: FC<{
  children: ReactNode
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ children, originalPath, currentPath, locale }) => {
  const app = useFirebaseApp()
  useInitializeFirestore(app)

  return (
    <>
      <TheHeader
        originalPath={originalPath}
        currentPath={currentPath}
        locale={locale}
        className="hidden md:block"
      />
      <header className="fixed md:hidden inset-x-0 border-b h-[56px] p-2 backdrop-blur border-gray-500 top-0 flex items-center space-x-2">
        <button
          className="btn-circle p-1 md:p-2"
          onClick={() => {
            navigate('/chat/')
          }}
        >
          <Icon icon={chevronLeft} className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <span className="text-xl">Public Chat</span>
      </header>

      <Main>{children}</Main>
    </>
  )
}

export default ChatRoom
