import { useEffect, useState, useContext } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore/lite'
import { initializeAuth, useAuthEmulator } from 'firebase/auth'
import { isLength0 } from '@miyauci/is-valid'
import { pipe } from 'fonction'
import { firebaseOptions } from '../../config/constants'
import FirebaseContext from '../contexts/firebase'
import { FirebaseState } from '../types/firebase'

const notInitialized = pipe(getApps, isLength0)

const useFirebaseProvider = () => {
  const [firebase, setFirebase] = useState<FirebaseState>({})

  useEffect(() => {
    if (notInitialized()) {
      const app = initializeApp(firebaseOptions)
      const firestore = initializeFirestore(app, {})
      const auth = initializeAuth(app)

      if (process.env.NODE_ENV === 'development') {
        useAuthEmulator(auth, 'http://localhost:9099')
      }

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

      setFirebase({ app, firestore, auth })
    }
  }, [])

  return [firebase, setFirebase] as [typeof firebase, typeof setFirebase]
}

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { useFirebaseProvider, useFirebase }
