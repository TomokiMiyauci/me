import { createContext } from 'react'
import { DEFAULT_CONTEXT_STATE } from '@/constants/state'
import type { MaybeAuth } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const AuthContext = createContext<StateSet<MaybeAuth>>(DEFAULT_CONTEXT_STATE)

export default AuthContext
