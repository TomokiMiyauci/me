import UserContext from '@/contexts/user'
import { useState, useMemo, useEffect, useContext } from 'react'
import type { UserState, MaybeUser } from '@/types/user'

const useUser = (): UserState[0] => useContext(UserContext)[0]

const useProviderUser = (): UserState => {
  const [user, changeUser] = useState<MaybeUser>()
  const isLoggedIn = useMemo<boolean>(() => !!user && !!user.uid, [user])

  useEffect(() => {
    if ('serviceWorker' in window.navigator) {
      const sw = window.navigator.serviceWorker

      sw.addEventListener(
        'message',
        ({ data }: MessageEvent<MaybeUser>) => {
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

export { useUser, useProviderUser }
