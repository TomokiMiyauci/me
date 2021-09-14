import { createContext } from 'react'
import type { MaybeMessaging } from '@/types/firebase'

const MessagingContext = createContext<MaybeMessaging>(undefined)

export default MessagingContext
