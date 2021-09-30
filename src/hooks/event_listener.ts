import { useEffect } from 'react'
import { makeEventListenerPair } from '@/utils/event_listener'
import { isBrowser } from '@/utils/environment'

const useEventListener = <T extends keyof WindowEventMap>(
  type: T,
  handler: (ev: WindowEventMap[T]) => void
): void => {
  const { register, unregister } = makeEventListenerPair(
    isBrowser ? window : undefined,
    type,
    handler
  )
  useEffect(() => {
    register()

    return unregister
  }, [])
}

export { useEventListener }
