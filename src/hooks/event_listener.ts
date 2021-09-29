import { useEffect } from 'react'
import { makeEventListenerPair } from '@/utils/event_listener'

const useEventListener = <T extends keyof WindowEventMap>(
  type: T,
  handler: (ev: WindowEventMap[T]) => void
): void => {
  const { register, unregister } = makeEventListenerPair(window, type, handler)
  useEffect(() => {
    register()

    return unregister
  }, [])
}

export { useEventListener }
