import { createContext } from 'react'
import type { UserState } from '@/types/user'

export default createContext<UserState>([
  {
    isLoggedIn: false
  },
  () => {}
])
