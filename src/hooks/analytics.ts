import { useAnalytics } from '@/hooks/firebase/analytics'
import type { Analytics, logEvent as _logEvent } from 'firebase/analytics'

/**
 * @remarks firebase analytics of `logEvent` types is made with override. Types is not portable.
 */
const useSafeLogEvent = () => {
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

export { useSafeLogEvent }
