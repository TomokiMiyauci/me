import { useEffect } from 'react'
import { makeEventListenerPair } from '@/utils/event_listener'
import { isBrowser } from '@/utils/environment'
import type { DependencyList } from 'react'

const useEventListener = <T extends keyof WindowEventMap>(
  type: T,
  handler: (ev: WindowEventMap[T]) => void,
  deps?: DependencyList
): void => {
  const { register, unregister } = makeEventListenerPair(
    isBrowser ? window : undefined,
    type,
    handler
  )
  useEffect(() => {
    register()

    return unregister
  }, deps)
}

export { useEventListener }
