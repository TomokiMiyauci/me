import { createContext } from 'react'
import type { MaybeFirestoreLite } from '@/types/firebase'

const FirestoreLiteContext = createContext<MaybeFirestoreLite>(undefined)

export default FirestoreLiteContext
