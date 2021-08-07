import { useState, useContext } from 'react'
import { getApps } from 'firebase/app'
import { connectFirestoreEmulator } from 'firebase/firestore/lite'
import { connectAuthEmulator } from 'firebase/auth'
import { isLength0 } from '@miyauci/is-valid'
import { pipe } from 'fonction'
import { firebaseOptions } from '@/../config/constants'
import FirebaseContext from '@/contexts/firebase'
import { FirebaseState } from '@/types/firebase'
import { isBrowser } from '@/utils/browser'
import { initializeAuth, browserLocalPersistence } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore/lite'

const notInitialized = pipe(getApps, isLength0)

const useFirebaseProvider = () => {
  const [firebase, setFirebase] = useState<FirebaseState>({})

  if (isBrowser && notInitialized()) {
    import('firebase/app').then(async ({ initializeApp }) => {
      const app = initializeApp(firebaseOptions)

      const firestore = initializeFirestore(app, {})

      const auth = initializeAuth(app, {
        persistence: browserLocalPersistence
      })

      if (process.env.NODE_ENV === 'development') {
        connectFirestoreEmulator(firestore, 'localhost', 8082)
        connectAuthEmulator(auth, 'http://localhost:9099')
      }

      const { initializePerformance } = await import('firebase/performance')
      initializePerformance(app)

      if (process.env.NODE_ENV === 'production') {
        const { isSupported, initializeAnalytics } = await import(
          'firebase/analytics'
        )
        const result = await isSupported()
        if (result) {
          console.info('Initialize: analytics')
          initializeAnalytics(app)
        }
      }

      setFirebase({ app, firestore, auth })
    })
  }

  return [firebase, setFirebase] as [typeof firebase, typeof setFirebase]
}

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { useFirebaseProvider, useFirebase }
