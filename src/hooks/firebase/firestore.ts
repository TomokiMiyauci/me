import FirestoreContext from '@/contexts/firebase/firestore'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'use-async-effect'

import type { MaybeFirestore, MaybeApp } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const useFirestore = (): MaybeFirestore => useContext(FirestoreContext)[0]
const useStateFirestore = (): StateSet<MaybeFirestore> =>
  useState<MaybeFirestore>()

const useInitializeFirestore = (app: MaybeApp): void => {
  const [firestore, setFirestore] = useContext(FirestoreContext)

  useAsyncEffect(async () => {
    if (!app || firestore) return
    const { initialize } = await import('@/utils/firebase/firestore')
    const _firestore = initialize(app)
    setFirestore(_firestore)
  }, [])

  useAsyncEffect(async () => {
    if (!app || firestore) return
    const { initialize } = await import('@/utils/firebase/firestore')
    const _firestore = initialize(app)
    setFirestore(_firestore)
  }, [app])
}

export { useInitializeFirestore, useStateFirestore, useFirestore }
