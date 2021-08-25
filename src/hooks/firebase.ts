import { useState, useContext } from 'react'
import { getApps } from 'firebase/app'
import { isLength0 } from '@/utils/is'
import { pipe } from 'fonction'
import FirebaseContext from '@/contexts/firebase'
import { FirebaseState } from '@/types/firebase'
import { lazy } from '@/utils/lazy'

const notInitialized = pipe(getApps, isLength0)

const useFirebaseProvider = () => {
  const [firebase, setFirebase] = useState<FirebaseState>({})

  lazy(() => {
    if (notInitialized()) {
      import('@/utils/firebase').then(({ initializeFirebase }) => {
        const { firestore, app, messaging, auth } = initializeFirebase()
        setFirebase({ app, firestore, messaging, auth })
      })
    }
  })

  return [firebase, setFirebase] as [typeof firebase, typeof setFirebase]
}

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { useFirebaseProvider, useFirebase }
