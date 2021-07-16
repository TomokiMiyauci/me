import React, { FC } from 'react'
import FirebaseContext from '@/contexts/firebase'
import { useFirebaseProvider } from '@/hooks/firebase'
import NoticeContext from '@/contexts/notice'
import { useNoticeProvider } from '@/hooks/notice'
import DarkModeContext from '@/contexts/dark_mode'
import { useDarkModeProvider } from '@/hooks/dark_mode'

const Index: FC = ({ children }) => {
  const firebase = useFirebaseProvider()
  const notice = useNoticeProvider()
  const darkMode = useDarkModeProvider()
  return (
    <FirebaseContext.Provider value={firebase}>
      <NoticeContext.Provider value={notice}>
        <DarkModeContext.Provider value={darkMode}>
          {children}
        </DarkModeContext.Provider>
      </NoticeContext.Provider>
    </FirebaseContext.Provider>
  )
}

export default Index
