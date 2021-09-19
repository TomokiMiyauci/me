import { createContext } from 'react'
import { DEFAULT_CONTEXT_STATE } from '@/constants/state'
import type { MaybeFirestore } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const FirestoreContext = createContext<StateSet<MaybeFirestore>>(
  DEFAULT_CONTEXT_STATE
)

export default FirestoreContext
