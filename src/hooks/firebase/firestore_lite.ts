import FirestoreLiteContext from '@/contexts/firebase/firestore_lite'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'use-async-effect'

import type { MaybeFirestoreLite, MaybeApp } from '@/types/firebase'
import type { Dispatch, SetStateAction } from 'react'

const useFirestoreLite = (): MaybeFirestoreLite =>
  useContext(FirestoreLiteContext)

const useProviderFirestoreLite = (
  app: MaybeApp
): [MaybeFirestoreLite, Dispatch<SetStateAction<MaybeFirestoreLite>>] => {
  const [firebaseLite, setFirebaseLite] = useState<MaybeFirestoreLite>()

  useAsyncEffect(async () => {
    if (app && !firebaseLite) {
      const { initializeFirestore } = await import(
        '@/utils/firebase/firestore_lite'
      )
      const firestore = initializeFirestore(app)
      setFirebaseLite(firestore)
    }
  }, [app])

  return [firebaseLite, setFirebaseLite]
}

export { useProviderFirestoreLite, useFirestoreLite }
