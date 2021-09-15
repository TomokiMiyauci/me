import NoticeContext from './notice'
import { useNoticeProvider } from '../hooks/notice'
import DarkModeContext from './dark_mode'
import { useDarkModeProvider } from '@/hooks/dark_mode'
import SearchContext from '@/components/Search/context'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'
import { useHash } from '@/hooks/hash'
import UserContext from '@/contexts/auth'
import { useAuthProvider } from '@/hooks/auth'
import { useProvideFirebaseApp } from '@/hooks/firebase/app'
import { useProviderFirestore } from '@/hooks/firebase/firestore'
import { useProviderFirestoreLite } from '@/hooks/firebase/firestore_lite'
import { useProviderMessaging } from '@/hooks/firebase/messaging'
import { useProviderAnalytics } from '@/hooks/firebase/analytics'
import { useProviderAuth } from '@/hooks/firebase/auth'
import AppContext from '@/contexts/firebase/app'
import FirestoreContext from '@/contexts/firebase/firestore'
import FirestoreLiteContext from '@/contexts/firebase/firestore_lite'
import MessagingContext from '@/contexts/firebase/messaging'
import AnalyticsContext from '@/contexts/firebase/analytics'
import AuthContext from '@/contexts/firebase/auth'

import type { FC } from 'react'

const ProvideSearchContext: FC = ({ children }) => {
  const { safeLogEvent } = useSafeLogEvent()
  const [isShowSearch, changeHash] = useHash('#search')

  const loggedChangeHash = (
    val: Parameters<typeof changeHash>[0]
  ): ReturnType<typeof changeHash> => {
    changeHash(val)
    const action = val ? 'show' : 'hide'
    safeLogEvent((analytics, logEvent) =>
      logEvent(analytics, 'select_content', {
        content_type: 'search',
        action
      })
    )
  }
  return (
    <SearchContext.Provider value={[isShowSearch, loggedChangeHash]}>
      {children}
    </SearchContext.Provider>
  )
}

const Index: FC = ({ children }) => {
  const auth = useAuthProvider()
  const notice = useNoticeProvider()
  const darkMode = useDarkModeProvider()

  const [app] = useProvideFirebaseApp()
  const [firestoreLite] = useProviderFirestoreLite(app)
  const [messaging] = useProviderMessaging(app)
  const [analytics] = useProviderAnalytics(app)
  const aut = useProviderAuth()
  const firestore = useProviderFirestore()

  return (
    <UserContext.Provider value={auth}>
      <AppContext.Provider value={app}>
        <FirestoreLiteContext.Provider value={firestoreLite}>
          <MessagingContext.Provider value={messaging}>
            <AnalyticsContext.Provider value={analytics}>
              <FirestoreContext.Provider value={firestore}>
                <NoticeContext.Provider value={notice}>
                  <DarkModeContext.Provider value={darkMode}>
                    <ProvideSearchContext>
                      <AuthContext.Provider value={aut}>
                        {children}
                      </AuthContext.Provider>
                    </ProvideSearchContext>
                  </DarkModeContext.Provider>
                </NoticeContext.Provider>
              </FirestoreContext.Provider>
            </AnalyticsContext.Provider>
          </MessagingContext.Provider>
        </FirestoreLiteContext.Provider>
      </AppContext.Provider>
    </UserContext.Provider>
  )
}

export default Index
