import FirestoreContext from '@/contexts/firebase/firestore'
import { useState, useContext } from 'react'

import type { MaybeFirestore } from '@/types/firebase'
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

export { useProviderFirestore, useFirestore }
