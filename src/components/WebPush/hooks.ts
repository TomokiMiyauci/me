import { useUser } from '@/hooks/user'
import { useFirestoreLite } from '@/hooks/firebase/firestore_lite'
import { useEffect, useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import { usePromiseState } from '@/hooks/state'

const useIsSupported = () => {
  const { changeState, ...rest } = usePromiseState()

  useAsyncEffect(async () => {
    const { isSupported } = await import('firebase/messaging')

    try {
      const supported = await isSupported()

      if (supported) {
        changeState('fulfilled')
      } else {
        changeState('rejected')
      }
    } catch {
      changeState('rejected')
    }
  }, [])

  return {
    ...rest
  }
}

const useUnsubscribe = () => {
  const [hasSubscribed, changeHasSubscribed] = useState(false)
  const { uid } = useUser()
  const firestore = useFirestoreLite()

  const retrieveStatus = async (): Promise<void> => {
    if (!firestore || !uid) return
    const { getDocs, collection } = await import('firebase/firestore/lite')
    const col = collection(firestore, 'users', uid, 'fcm')
    const docs = await getDocs(col)
    changeHasSubscribed(!docs.empty)
  }

  useEffect(() => {
    retrieveStatus()
  }, [firestore, uid])

  return [hasSubscribed, retrieveStatus] as const
}

export { useIsSupported, useUnsubscribe }
