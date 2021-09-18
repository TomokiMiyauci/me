import { createContext } from 'react'
import { DEFAULT_CONTEXT_STATE } from '@/constants/state'
import type { MaybeFirestoreLite } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const FirestoreLiteContext = createContext<StateSet<MaybeFirestoreLite>>(
  DEFAULT_CONTEXT_STATE
)

export default FirestoreLiteContext
