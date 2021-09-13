import type { Dispatch, SetStateAction } from 'react'
import type { User as U } from 'firebase/auth'

type Writable<
  T extends Record<PropertyKey, unknown>,
  U extends keyof T = keyof T
> = {
  -readonly [k in U]: T[k]
} & { [k in Exclude<keyof T, U>]: T[k] }

type UserContext = [
  Partial<User> & Pick<UserInfo, 'isLoggedIn'>,
  Dispatch<SetStateAction<User | undefined>>
]

type User = Writable<Pick<U, 'uid' | 'isAnonymous'>>

type UserInfo = User & {
  isLoggedIn: boolean
}

export type { UserContext, UserInfo, User }
