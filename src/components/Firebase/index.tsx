import React, { FC, useEffect, useState } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore/lite'
import FirebaseContext, { FirebaseState } from './Context'
import { isLength0 } from '@miyauci/is-valid'
import { pipe } from 'fonction'
import { firebaseOptions } from '../../../config/constants'

const notInitialized = pipe(getApps, isLength0)

const Index: FC = ({ children }) => {
  const [firebase, setFirebase] = useState<FirebaseState>({})

  useEffect(() => {
    if (notInitialized()) {
      const app = initializeApp(firebaseOptions)
      const firestore = initializeFirestore(app, {})

      if (window && process.env.NODE_ENV === 'production') {
        import('firebase/analytics').then(
          async ({ isSupported, initializeAnalytics }) => {
            const result = await isSupported()
            if (result) {
              console.info('Initialize: analytics')
              initializeAnalytics(app)
            }
          }
        )
      }

      setFirebase({ app, firestore })
    }
  }, [])

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default Index
