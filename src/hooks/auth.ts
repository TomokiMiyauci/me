import { useState, useMemo, useContext, useEffect } from 'react'
import type { UserContext } from '@/types/user'
import AuthContext from '@/contexts/auth'

const useAuthProvider = (): UserContext => {
  const [uid, changeUid] = useState<string>('')
  const isLoggedIn = useMemo<boolean>(() => !!uid, [uid])

  useEffect(() => {
    const worker = new Worker('/worker.js')
    worker.addEventListener('message', (ev) => {
      changeUid(ev.data)
    })

    worker.postMessage({
      type: 'init'
    })
  }, [])

  return [
    {
      isLoggedIn,
      uid
    },
    changeUid
  ]
}

const useAuth = () => useContext(AuthContext)

export { useAuthProvider, useAuth }
