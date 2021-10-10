import MessagingContext from '@/contexts/firebase/messaging'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'react-hookable'

import type { MaybeApp, MaybeMessaging } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const useMessaging = (): MaybeMessaging => useContext(MessagingContext)[0]
const useStateMessaging = (): StateSet<MaybeMessaging> =>
  useState<MaybeMessaging>()

const useInitializeMessaging = (app: MaybeApp): void => {
  const [messaging, setMessaging] = useContext(MessagingContext)

  useAsyncEffect(async () => {
    if (app && !messaging) {
      const { isSupported, getMessaging } = await import('firebase/messaging')
      const result = await isSupported().catch(() => false)
      const _messaging = result ? getMessaging(app) : undefined

      setMessaging(_messaging)
    }
  }, [app])
}

export { useStateMessaging, useInitializeMessaging, useMessaging }
