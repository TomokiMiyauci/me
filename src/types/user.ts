import type { Dispatch, SetStateAction } from 'react'

type MaybeUser = string | undefined
type UserContext = [
  {
    uid: string | undefined
    isLoggedIn: boolean
  },
  Dispatch<SetStateAction<MaybeUser>>
]

export type { UserContext }
