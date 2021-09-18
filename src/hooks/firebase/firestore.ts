import FirestoreContext from '@/contexts/firebase/firestore'
import { useState, useContext, useEffect } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import AppContext from '@/contexts/firebase/app'
import { initialize } from '@/utils/firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseOptions } from '@/../config/constants'

import type { MaybeFirestore, MaybeApp } from '@/types/firebase'
import type { StateSet } from '@/types/state'
import type { Firestore } from 'firebase/firestore'
import type { DependencyList, EffectCallback } from 'react'

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

const useSafeFirestoreEffect = (
  fn: (firestore: Firestore) => ReturnType<EffectCallback>,
  deps?: DependencyList
) => {
  const [app, setApp] = useContext(AppContext)
  const [firestore, setFirestore] = useContext(FirestoreContext)

  useEffect(() => {
    const _app = app ? app : initializeApp(firebaseOptions)
    if (!app) {
      setApp(_app)
    }

    const _firestore = firestore ? firestore : initialize(_app)

    if (!firestore) {
      setFirestore(_firestore)
    }

    return fn(_firestore)
  }, deps)
}

export {
  useInitializeFirestore,
  useStateFirestore,
  useFirestore,
  useSafeFirestoreEffect
}
