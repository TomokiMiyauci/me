import FirestoreLiteContext from '@/contexts/firebase/firestore_lite'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'react-hookable'

import type { MaybeFirestoreLite, MaybeApp } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const useFirestoreLite = (): MaybeFirestoreLite =>
  useContext(FirestoreLiteContext)[0]
const useStateFirebaseLite = (): StateSet<MaybeFirestoreLite> =>
  useState<MaybeFirestoreLite>()

const useInitializeFirestoreLite = (app: MaybeApp): void => {
  const [firebaseLite, setFirebaseLite] = useContext(FirestoreLiteContext)

  useAsyncEffect(async () => {
    if (app && !firebaseLite) {
      const { initializeFirestore } = await import(
        '@/utils/firebase/firestore_lite'
      )
      const firestore = initializeFirestore(app)
      setFirebaseLite(firestore)
    }
  }, [app])
}

export { useStateFirebaseLite, useInitializeFirestoreLite, useFirestoreLite }
