import { useState, useMemo, useContext, useEffect } from 'react'
import type { MaybeUser, UserContext } from '@/types/user'
import AuthContext from '@/contexts/auth'
import { useFirebase } from '@/hooks/firebase'
import { signInAnonymously } from 'firebase/auth'

const useAuthProvider = (): UserContext => {
  const [user, changeUser] = useState<MaybeUser>(null)
  const isLoggedIn = useMemo<boolean>(() => !!user, [user])

  const [{ auth }] = useFirebase()

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          changeUser(user)
        } else {
          console.info('Sign in as Anonymous')
          unsubscribe()
          signInAnonymously(auth)
            .then(({ user }) => changeUser(user))
            .catch((e) => {
              console.warn(e)
            })
        }
      })
    }
  }, [auth])

  return [
    {
      user,
      isLoggedIn
    },
    changeUser
  ]
}

const useAuth = () => useContext(AuthContext)

export { useAuthProvider, useAuth }
