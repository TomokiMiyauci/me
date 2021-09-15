import AuthContext from '@/contexts/firebase/auth'
import { useState, useContext } from 'react'

import type { MaybeAuth } from '@/types/firebase'
import type { Dispatch, SetStateAction } from 'react'

const useAuth = (): [MaybeAuth, Dispatch<SetStateAction<MaybeAuth>>] =>
  useContext(AuthContext)

const useProviderAuth = (): [
  MaybeAuth,
  Dispatch<SetStateAction<MaybeAuth>>
] => {
  const [auth, setAuth] = useState<MaybeAuth>()

  return [auth, setAuth]
}

export { useProviderAuth, useAuth }
