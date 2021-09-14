import { createContext } from 'react'
import type { MaybeApp } from '@/types/firebase'

const AppContext = createContext<MaybeApp>(undefined)

export default AppContext
