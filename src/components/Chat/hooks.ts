import { useMemo } from 'react'
import { useFirestore } from '@/hooks/firebase/firestore'
import { useUser } from '@/hooks/user'

type Step = 'INIT' | 'LOGIN' | 'AUTHED'
const useStep = (): Step => {
  const firestore = useFirestore()
  const { isAnonymous, isLoggedIn } = useUser()

  const step = useMemo<Step>(() => {
    if (!firestore) return 'INIT'
    if (!isLoggedIn || isAnonymous) return 'LOGIN'
    return 'AUTHED'
  }, [firestore, isLoggedIn])

  return step
}

export { useStep }
export type { Step }
