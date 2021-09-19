import FirestoreContext from '@/contexts/firebase/firestore'
import { useState, useContext, useEffect } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import AppContext from '@/contexts/firebase/app'
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

    if (firestore) {
      setFirestore(firestore)
      return fn(firestore)
    } else {
      import('@/utils/firebase/firestore').then(({ initializeFirestore }) => {
        const firestore = initializeFirestore(_app)
        setFirestore(firestore)
        return fn(firestore)
      })
    }
  }, deps)
}

export {
  useInitializeFirestore,
  useStateFirestore,
  useFirestore,
  useSafeFirestoreEffect
}
