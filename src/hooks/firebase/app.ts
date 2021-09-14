import AppContext from '@/contexts/firebase/app'

import { useState, useContext } from 'react'
import { getApps } from 'firebase/app'
import { isLength0 } from '@/utils/is'
import { pipe } from 'fonction'
import { useLazy } from '@/utils/lazy'

import type { Dispatch, SetStateAction } from 'react'
import type { MaybeApp } from '@/types/firebase'

const useFirebaseApp = (): MaybeApp => useContext(AppContext)
const notInitialized = pipe(getApps, isLength0)

const useProvideFirebaseApp = (): [
  MaybeApp,
  Dispatch<SetStateAction<MaybeApp>>
] => {
  const [app, setApp] = useState<MaybeApp>()

  useLazy(async () => {
    if (notInitialized()) {
      const { initializeApp } = await import('firebase/app')
      const { firebaseOptions } = await import('@/../config/constants')
      const app = initializeApp(firebaseOptions)

      setApp(app)
    }
  })

  return [app, setApp]
}

export { useProvideFirebaseApp, useFirebaseApp }
