import type { User } from 'firebase/auth'
import type { Dispatch, SetStateAction } from 'react'

type MaybeUser = User | null
type UserContext = [
  {
    user?: MaybeUser
    uid: string
    isLoggedIn: boolean
  },
  Dispatch<SetStateAction<MaybeUser>>
]

export type { MaybeUser, UserContext }
