import FirestoreContext from '@/contexts/firebase/firestore'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'use-async-effect'

import type { MaybeFirestore, MaybeApp } from '@/types/firebase'
import type { Dispatch, SetStateAction } from 'react'

const useFirestore = (): [
  MaybeFirestore,
  Dispatch<SetStateAction<MaybeFirestore>>
] => useContext(FirestoreContext)

const useProviderFirestore = (): [
  MaybeFirestore,
  Dispatch<SetStateAction<MaybeFirestore>>
] => {
  const firestore = useState<MaybeFirestore>()
  return firestore
}

const useInitializerFirestore = (app: MaybeApp): void => {
  const [firestore, setFirestore] = useFirestore()

  useAsyncEffect(async () => {
    if (!app || firestore) return
    const { initialize } = await import('@/utils/firebase/firestore')
    console.log(initialize, 'fn')
    const _firestore = initialize(app)
    setFirestore(_firestore)
  }, [])

  useAsyncEffect(async () => {
    if (!app || firestore) return
    const { initialize } = await import('@/utils/firebase/firestore')
    console.log(initialize, 'fn')
    const _firestore = initialize(app)
    setFirestore(_firestore)
  }, [app])
}

export { useProviderFirestore, useFirestore, useInitializerFirestore }
