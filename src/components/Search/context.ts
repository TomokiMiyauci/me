import { createContext } from 'react'
import type { useSwitch } from '@/hooks/state'

export default createContext<ReturnType<typeof useSwitch>>([
  false,
  {
    on: () => {},
    off: () => {}
  }
])
