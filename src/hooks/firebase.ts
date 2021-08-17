import { useState, useContext } from 'react'
import { getApps } from 'firebase/app'
import { isLength0 } from '@/utils/is'
import { pipe } from 'fonction'
import FirebaseContext from '@/contexts/firebase'
import { FirebaseState } from '@/types/firebase'
import { isBrowser } from '@/utils/environment'

const notInitialized = pipe(getApps, isLength0)

const useFirebaseProvider = () => {
  const [firebase, setFirebase] = useState<FirebaseState>({})

  if (isBrowser && notInitialized()) {
    import('@/utils/firebase').then(({ initializeFirebase }) => {
      const { firestore, auth, app, messaging } = initializeFirebase()
      setFirebase({ app, firestore, auth, messaging })
    })
  }

  return [firebase, setFirebase] as [typeof firebase, typeof setFirebase]
}

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { useFirebaseProvider, useFirebase }
