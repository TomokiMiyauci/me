import type { Dispatch, SetStateAction } from 'react'

type UserContext = [
  {
    uid: string
    isLoggedIn: boolean
  },
  Dispatch<SetStateAction<string>>
]

export type { UserContext }
