import { useEffect, useState, useContext } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import {
  initializeFirestore,
  useFirestoreEmulator
} from 'firebase/firestore/lite'
import {
  initializeAuth,
  useAuthEmulator,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
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
      const auth = initializeAuth(app, {
        persistence: browserLocalPersistence
      })

      if (process.env.NODE_ENV === 'development') {
        useFirestoreEmulator(firestore, 'localhost', 8081)
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
