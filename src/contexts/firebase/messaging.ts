import { createContext } from 'react'
import { DEFAULT_CONTEXT_STATE } from '@/constants/state'
import type { MaybeMessaging } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const MessagingContext = createContext<StateSet<MaybeMessaging>>(
  DEFAULT_CONTEXT_STATE
)

export default MessagingContext
