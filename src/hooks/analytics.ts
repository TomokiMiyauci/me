import { useFirebase } from '@/hooks/firebase'
import type { Analytics } from 'firebase/analytics'

const useSafeLogEvent = () => {
  const [{ analytics }] = useFirebase()

  const safeLogEvent = (
    safeCall: (analytics: Analytics) => void | Promise<void>
  ) => {
    if (!analytics) return
    return safeCall(analytics)
  }

  return {
    safeLogEvent
  }
}

export { useSafeLogEvent }
