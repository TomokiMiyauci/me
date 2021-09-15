import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { MaybeFirestore } from '@/types/firebase'

const FirestoreContext = createContext<
  [MaybeFirestore, Dispatch<SetStateAction<MaybeFirestore>>]
>([undefined, () => {}])

export default FirestoreContext
