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
  Partial<User> &
    Pick<
      User & {
        isLoggedIn: boolean
      },
      'isLoggedIn'
    >,
  Dispatch<SetStateAction<User | undefined>>
]

type User = Writable<
  Pick<U, 'uid' | 'isAnonymous' | 'displayName' | 'emailVerified' | 'photoURL'>
>
type MaybeUser = Maybe<User>

type UserInfo = Pick<User, 'uid' | 'displayName' | 'photoURL'>

export type { UserState, UserInfo, User, MaybeUser }
