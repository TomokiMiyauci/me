import AuthContext from '@/contexts/auth'
import { useState, useMemo, useEffect, useContext } from 'react'
import type { UserContext, User } from '@/types/user'

const useAuth = (): UserContext => useContext(AuthContext)

const useAuthProvider = (): UserContext => {
  const [user, changeUser] = useState<User | undefined>()
  const isLoggedIn = useMemo<boolean>(() => !!user && !!user.uid, [user])

  useEffect(() => {
    if ('serviceWorker' in window.navigator) {
      const sw = window.navigator.serviceWorker

      sw.addEventListener(
        'message',
        ({ data }: MessageEvent<User>) => {
          changeUser(data)
        },
        {
          once: true
        }
      )
      sw.ready.then((registration) => {
        registration.active?.postMessage('')
      })
    }
  }, [])

  return [
    {
      ...user,
      isLoggedIn
    },
    changeUser
  ]
}

export { useAuth, useAuthProvider }
