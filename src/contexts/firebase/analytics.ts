import { createContext } from 'react'
import type { MaybeAnalytics } from '@/types/firebase'

const AnalyticsContext = createContext<MaybeAnalytics>(undefined)

export default AnalyticsContext
