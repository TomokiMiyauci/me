import { createContext } from 'react'
import { DEFAULT_CONTEXT_STATE } from '@/constants/state'
import type { MaybeApp } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const AppContext = createContext<StateSet<MaybeApp>>(DEFAULT_CONTEXT_STATE)

export default AppContext
