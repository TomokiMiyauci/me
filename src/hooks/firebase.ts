import { useState, useContext, useMemo } from 'react'
import { getApps } from 'firebase/app'
import { isLength0 } from '@/utils/is'
import { pipe } from 'fonction'
import FirebaseContext from '@/contexts/firebase'
import { FirebaseState } from '@/types/firebase'
import { useLazy } from '@/utils/lazy'
import { useAuth } from '@/hooks/auth'

const notInitialized = pipe(getApps, isLength0)

const useFirebaseProvider = () => {
  const [firebase, setFirebase] = useState<FirebaseState>({})
  const [{ uid, isLoggedIn }] = useAuth()

  const isInitialized = useMemo<boolean>(() => {
    return !!firebase.app
  }, [firebase.app])
  const isReady = useMemo<boolean>(
    () => isLoggedIn && isInitialized,
    [isLoggedIn, isInitialized]
  )

  useLazy(() => {
    if (notInitialized()) {
      import('@/utils/firebase').then(({ initializeFirebase }) => {
        const { app, messaging, auth } = initializeFirebase()
        setFirebase({ app, messaging, auth })
      })
    }
  })

  return [
    { ...firebase, uid, isLoggedIn, isInitialized, isReady },
    setFirebase
  ] as const
}

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { useFirebaseProvider, useFirebase }
