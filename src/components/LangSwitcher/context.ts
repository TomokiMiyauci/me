import { createContext } from 'react'
import type { StateSet } from '@/types/state'

export default createContext<StateSet<boolean>>([false, () => {}])
