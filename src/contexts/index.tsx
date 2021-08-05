import React, { FC } from 'react'
import FirebaseContext from './firebase'
import { useFirebaseProvider } from '../hooks/firebase'
import NoticeContext from './notice'
import { useNoticeProvider } from '../hooks/notice'
import DarkModeContext from './dark_mode'
import { useDarkModeProvider } from '../hooks/dark_mode'
import { useToggle } from '@/hooks/state'
import SearchContext from '@/components/Search/context'

const Index: FC = ({ children }) => {
  const firebase = useFirebaseProvider()
  const notice = useNoticeProvider()
  const darkMode = useDarkModeProvider()
  const search = useToggle(false)
  return (
    <FirebaseContext.Provider value={firebase}>
      <NoticeContext.Provider value={notice}>
        <DarkModeContext.Provider value={darkMode}>
          <SearchContext.Provider value={search}>
            {children}
          </SearchContext.Provider>
        </DarkModeContext.Provider>
      </NoticeContext.Provider>
    </FirebaseContext.Provider>
  )
}

export default Index
