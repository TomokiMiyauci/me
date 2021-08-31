import { useAuth } from '@/hooks/auth'
import { useFirebase } from '@/hooks/firebase'
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

const useUnsubscribe = () => {
  const [hasSubscribed, changeHasSubscribed] = useState(false)
  const [{ uid }] = useAuth()
  const [{ firestore }] = useFirebase()

  const retrieveStatus = async (): Promise<void> => {
    const { getDocs, collection } = await import('firebase/firestore/lite')
    const col = collection(firestore!, 'users', uid, 'fcm')
    const docs = await getDocs(col)
    changeHasSubscribed(!docs.empty)
  }

  useEffect(() => {
    retrieveStatus()
  }, [])

  return [hasSubscribed, retrieveStatus] as const
}

export { useIsSupported, useUnsubscribe }
