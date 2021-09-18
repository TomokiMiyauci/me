import AuthContext from '@/contexts/firebase/auth'
import { useState, useContext } from 'react'

import type { MaybeAuth } from '@/types/firebase'
import type { Dispatch, SetStateAction } from 'react'
import type { StateSet } from '@/types/state'

const useAuth = (): MaybeAuth => useContext(AuthContext)[0]
const useStateAuth = (): StateSet<MaybeAuth> => useState<MaybeAuth>()

const useProviderAuth = (): [
  MaybeAuth,
  Dispatch<SetStateAction<MaybeAuth>>
] => {
  const [auth, setAuth] = useState<MaybeAuth>()

  return [auth, setAuth]
}

export { useStateAuth, useProviderAuth, useAuth }
