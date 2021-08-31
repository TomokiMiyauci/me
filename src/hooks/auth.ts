import { useState, useMemo, useEffect } from 'react'

const useAuth = () => {
  const [uid, changeUid] = useState<string | undefined>(undefined)
  const isLoggedIn = useMemo<boolean>(() => !!uid, [uid])

  useEffect(() => {
    if ('serviceWorker' in window.navigator) {
      const sw = window.navigator.serviceWorker

      sw.ready.then((registration) => {
        registration.active?.postMessage('')
      })

      sw.addEventListener(
        'message',
        ({ data }) => {
          changeUid(data)
        },
        {
          once: true
        }
      )
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
