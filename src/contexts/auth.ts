import { createContext } from 'react'
import type { UserContext } from '@/types/user'

export default createContext<UserContext>([
  {
    isLoggedIn: false
  },
  () => {}
])
