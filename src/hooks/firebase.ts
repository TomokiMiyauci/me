import { useState, useContext } from 'react'
import { getApps } from 'firebase/app'
import { isLength0 } from '@miyauci/is-valid'
import { pipe } from 'fonction'
import FirebaseContext from '@/contexts/firebase'
import { FirebaseState } from '@/types/firebase'
import { isBrowser } from '@/utils/environment'

const notInitialized = pipe(getApps, isLength0)

const useFirebaseProvider = () => {
  const [firebase, setFirebase] = useState<FirebaseState>({})

  if (isBrowser && notInitialized()) {
    import('@/utils/firebase').then(({ initializeFirebase }) => {
      const { firestore, auth, app } = initializeFirebase()
      setFirebase({ app, firestore, auth })
    })
  }

  return [firebase, setFirebase] as [typeof firebase, typeof setFirebase]
}

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { useFirebaseProvider, useFirebase }
