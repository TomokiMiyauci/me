import { createContext } from 'react'
import { useToggle } from '@/hooks/state'

export default createContext<ReturnType<typeof useToggle>>([false, () => {}])
