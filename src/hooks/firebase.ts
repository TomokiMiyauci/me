import { useState, useContext, useMemo } from 'react'
import { getApps } from 'firebase/app'
import { isLength0 } from '@/utils/is'
import { pipe } from 'fonction'
import FirebaseContext from '@/contexts/firebase'
import { FirebaseState } from '@/types/firebase'
import { useLazy } from '@/utils/lazy'

const notInitialized = pipe(getApps, isLength0)

const useFirebaseProvider = () => {
  const [firebase, setFirebase] = useState<FirebaseState>({})

  const hasInitialized = useMemo<boolean>(() => {
    return !!firebase.app && !!firebase.firestore
  }, [firebase.app, firebase.firestore])

  useLazy(() => {
    if (notInitialized()) {
      import('@/utils/firebase').then(async ({ initializeFirebase }) => {
        const { firestore, app, messaging, auth, analytics } =
          await initializeFirebase()
        setFirebase({ app, firestore, messaging, auth, analytics })
      })
    }
  })

  return [{ ...firebase, hasInitialized }, setFirebase] as const
}

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { useFirebaseProvider, useFirebase }
