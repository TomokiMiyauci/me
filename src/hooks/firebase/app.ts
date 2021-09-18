import AppContext from '@/contexts/firebase/app'

import { useState, useContext } from 'react'
import { getApps } from 'firebase/app'
import { isLength0 } from '@/utils/is'
import { pipe } from 'fonction'
import { useLazy } from '@/utils/lazy'

import type { MaybeApp } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const useFirebaseApp = (): MaybeApp => useContext(AppContext)[0]
const notInitialized = pipe(getApps, isLength0)
const useStateFirebaseApp = (): StateSet<MaybeApp> => useState<MaybeApp>()

const useInitializeFirebaseApp = (): void => {
  const [app, setApp] = useContext(AppContext)

  useLazy(async () => {
    if (notInitialized() && !app) {
      const { initializeApp } = await import('firebase/app')
      const { firebaseOptions } = await import('@/../config/constants')
      const app = initializeApp(firebaseOptions)

      setApp(app)
    }
  })
}

export { useInitializeFirebaseApp, useFirebaseApp, useStateFirebaseApp }
