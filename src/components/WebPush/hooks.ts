import { useEffect, useState, useMemo } from 'react'

type State = 'pending' | 'rejected' | 'fulfilled'
const useIsSupported = () => {
  const [state, changeState] = useState<State>('pending')
  const isPending = useMemo(() => state === 'pending', [state])
  const isRejected = useMemo(() => state === 'rejected', [state])
  const isFulfilled = useMemo(() => state === 'fulfilled', [state])

  useEffect(() => {
    import('firebase/messaging').then(({ isSupported }) => {
      isSupported()
        .then((result) => {
          if (result) {
            changeState('fulfilled')
          } else {
            changeState('rejected')
          }
        })
        .catch(() => {
          changeState('rejected')
        })
    })
  }, [])

  return {
    isPending,
    isRejected,
    isFulfilled
  }
}

export { useIsSupported }
