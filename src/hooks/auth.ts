import { useState, useMemo, useContext, useEffect } from 'react'
import AuthContext from '@/contexts/auth'
import { useFirebase } from '@/hooks/firebase'
import { signInAnonymously } from 'firebase/auth'
import type { MaybeUser, UserContext } from '@/types/user'

const useAuthProvider = (): UserContext => {
  const [user, changeUser] = useState<MaybeUser>(null)
  const isLoggedIn = useMemo<boolean>(() => !!user, [user])
  const uid = useMemo<string>(() => user?.uid ?? '', [user])

  const [{ auth }] = useFirebase()

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          unsubscribe()
          console.info('Already signed in')
          changeUser(user)
        } else {
          unsubscribe()
          console.info('Sign in as Anonymous')
          signInAnonymously(auth)
            .then(({ user }) => changeUser(user))
            .catch(console.warn)
        }
      })
    }
  }, [auth])

  return [
    {
      user,
      uid,
      isLoggedIn
    },
    changeUser
  ]
}

const useAuth = () => useContext(AuthContext)

export { useAuthProvider, useAuth }
