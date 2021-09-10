import FirebaseContext from './firebase'
import { useFirebaseProvider } from '../hooks/firebase'
import NoticeContext from './notice'
import { useNoticeProvider } from '../hooks/notice'
import DarkModeContext from './dark_mode'
import { useDarkModeProvider } from '@/hooks/dark_mode'
import SearchContext from '@/components/Search/context'
import { useSafeLogEvent } from '@/hooks/analytics'
import { useHash } from '@/hooks/hash'

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
  const firebase = useFirebaseProvider()
  const notice = useNoticeProvider()
  const darkMode = useDarkModeProvider()

  return (
    <FirebaseContext.Provider value={firebase}>
      <NoticeContext.Provider value={notice}>
        <DarkModeContext.Provider value={darkMode}>
          <ProvideSearchContext>{children}</ProvideSearchContext>
        </DarkModeContext.Provider>
      </NoticeContext.Provider>
    </FirebaseContext.Provider>
  )
}

export default Index
