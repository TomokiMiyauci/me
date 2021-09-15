import type { Dispatch, SetStateAction } from 'react'
import type { User as U } from 'firebase/auth'
import type { Maybe } from '@/types/generics'

type Writable<
  T extends Record<PropertyKey, unknown>,
  U extends keyof T = keyof T
> = {
  -readonly [k in U]: T[k]
} & { [k in Exclude<keyof T, U>]: T[k] }

type UserState = [
  Partial<User> & Pick<UserInfo, 'isLoggedIn'>,
  Dispatch<SetStateAction<User | undefined>>
]

type User = Writable<Pick<U, 'uid' | 'isAnonymous'>>
type MaybeUser = Maybe<User>

type UserInfo = User & {
  isLoggedIn: boolean
}

export type { UserState, UserInfo, User, MaybeUser }
