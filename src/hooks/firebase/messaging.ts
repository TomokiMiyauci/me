import MessagingContext from '@/contexts/firebase/messaging'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'use-async-effect'

import type { MaybeApp, MaybeMessaging } from '@/types/firebase'
import type { Dispatch, SetStateAction } from 'react'

const useMessaging = (): MaybeMessaging => useContext(MessagingContext)

const useProviderMessaging = (
  app: MaybeApp
): [MaybeMessaging, Dispatch<SetStateAction<MaybeMessaging>>] => {
  const [messaging, setMessaging] = useState<MaybeMessaging>()

  useAsyncEffect(async () => {
    if (app && !messaging) {
      const { isSupported, getMessaging } = await import('firebase/messaging')
      const result = await isSupported().catch(() => false)
      const _messaging = result ? getMessaging(app) : undefined

      setMessaging(_messaging)
    }
  }, [app])

  return [messaging, setMessaging]
}

export { useProviderMessaging, useMessaging }
