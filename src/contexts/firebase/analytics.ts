import { createContext } from 'react'
import { DEFAULT_CONTEXT_STATE } from '@/constants/state'
import type { MaybeAnalytics } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const AnalyticsContext = createContext<StateSet<MaybeAnalytics>>(
  DEFAULT_CONTEXT_STATE
)
export default AnalyticsContext
