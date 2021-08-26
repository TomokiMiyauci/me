import { useState, useMemo, useEffect } from 'react'

const useAuth = () => {
  const [uid, changeUid] = useState<string | undefined>(undefined)
  const isLoggedIn = useMemo<boolean>(() => !!uid, [uid])

  useEffect(() => {
    if ('navigator' in window) {
      const sw = window.navigator.serviceWorker

      sw.ready.then((registration) => {
        registration.active?.postMessage('')
      })

      sw.onmessage = ({ data }) => {
        changeUid(data)
      }
    }
  }, [])

  return [
    {
      uid,
      isLoggedIn
    },
    changeUid
  ] as const
}

export { useAuth }
