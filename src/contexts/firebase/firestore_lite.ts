import { createContext } from 'react'
import type { MaybeFirestoreLite } from '@/types/firebase'

const FirebaseLiteContext = createContext<MaybeFirestoreLite>(undefined)

export default FirebaseLiteContext
