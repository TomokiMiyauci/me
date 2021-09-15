import { createContext } from 'react'
import type { MaybeAuth } from '@/types/firebase'
import type { Dispatch, SetStateAction } from 'react'

const AuthContext = createContext<
  [MaybeAuth, Dispatch<SetStateAction<MaybeAuth>>]
>([undefined, () => {}])

export default AuthContext
