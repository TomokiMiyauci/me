import FirestoreContext from '@/contexts/firebase/firestore'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'react-hookable'

import type { MaybeFirestore, MaybeApp } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const useFirestore = (): MaybeFirestore => useContext(FirestoreContext)[0]
const useStateFirestore = (): StateSet<MaybeFirestore> =>
  useState<MaybeFirestore>()

const useInitializeFirestore = (app: MaybeApp): void => {
  const [firestore, setFirestore] = useContext(FirestoreContext)

  useAsyncEffect(async () => {
    if (!app || firestore) return
    const { initializeFirestore } = await import('@/utils/firebase/firestore')
    const _firestore = initializeFirestore(app)
    setFirestore(_firestore)
  }, [])

  useAsyncEffect(async () => {
    if (!app || firestore) return
    const { initializeFirestore } = await import('@/utils/firebase/firestore')
    const _firestore = initializeFirestore(app)
    setFirestore(_firestore)
  }, [app])
}

export { useInitializeFirestore, useStateFirestore, useFirestore }
