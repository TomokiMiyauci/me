import AnalyticsContext from '@/contexts/firebase/analytics'
import { useState, useContext } from 'react'
import { useAsyncEffect } from 'react-hookable'

import type { Analytics, logEvent as _logEvent } from 'firebase/analytics'
import type { MaybeApp, MaybeAnalytics } from '@/types/firebase'
import type { StateSet } from '@/types/state'

const useAnalytics = (): MaybeAnalytics => useContext(AnalyticsContext)[0]
const useStateAnalytics = (): StateSet<MaybeAnalytics> =>
  useState<MaybeAnalytics>()

const useInitializeAnalytics = (app: MaybeApp): void => {
  const [analytics, setAnalytics] = useContext(AnalyticsContext)

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
}

/**
 * @remarks firebase analytics of `logEvent` types is made with override. Types is not portable.
 */
const useSafeLogEvent = (): {
  safeLogEvent: (
    safeCall: (
      analytics: Analytics,
      logEvent: typeof _logEvent
    ) => void | Promise<void>
  ) => Promise<void>
} => {
  const analytics = useAnalytics()

  const safeLogEvent = async (
    safeCall: (
      analytics: Analytics,
      logEvent: typeof _logEvent
    ) => void | Promise<void>
  ): Promise<void> => {
    if (!analytics) return
    const { logEvent } = await import('firebase/analytics')
    return safeCall(analytics, logEvent)
  }

  return {
    safeLogEvent
  }
}

export {
  useInitializeAnalytics,
  useAnalytics,
  useStateAnalytics,
  useSafeLogEvent
}
