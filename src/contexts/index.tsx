import FirebaseContext from './firebase'
import { useFirebaseProvider } from '../hooks/firebase'
import NoticeContext from './notice'
import { useNoticeProvider } from '../hooks/notice'
import DarkModeContext from './dark_mode'
import { useDarkModeProvider } from '@/hooks/dark_mode'
import SearchContext from '@/components/Search/context'
import { useState } from 'react'

import type { FC } from 'react'

const Index: FC = ({ children }) => {
  const firebase = useFirebaseProvider()
  const notice = useNoticeProvider()
  const darkMode = useDarkModeProvider()
  const state = useState(false)
  return (
    <FirebaseContext.Provider value={firebase}>
      <NoticeContext.Provider value={notice}>
        <DarkModeContext.Provider value={darkMode}>
          <SearchContext.Provider value={state}>
            {children}
          </SearchContext.Provider>
        </DarkModeContext.Provider>
      </NoticeContext.Provider>
    </FirebaseContext.Provider>
  )
}

export default Index
