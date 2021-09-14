import AnalyticsContext from '@/contexts/firebase/analytics'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'use-async-effect'

import type { MaybeApp, MaybeAnalytics } from '@/types/firebase'
import type { Dispatch, SetStateAction } from 'react'

const useAnalytics = (): MaybeAnalytics => useContext(AnalyticsContext)

const useProviderAnalytics = (
  app: MaybeApp
): [MaybeAnalytics, Dispatch<SetStateAction<MaybeAnalytics>>] => {
  const [analytics, setAnalytics] = useState<MaybeAnalytics>()

  useAsyncEffect(async () => {
    if (app && !analytics) {
      const { isSupported, initializeAnalytics } = await import(
        'firebase/analytics'
      )
      const result = await isSupported().catch(() => false)
      const _analytics = result ? initializeAnalytics(app) : undefined

      setAnalytics(_analytics)
    }
  }, [app])

  return [analytics, setAnalytics]
}

export { useProviderAnalytics, useAnalytics }
