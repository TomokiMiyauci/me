import { useEffect } from 'react'
import { makeEventListenerPair } from '@/utils/event_listener'
import { isBrowser } from '@/utils/environment'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'

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

const useKeydown = (
  handler: (ev: KeyboardEvent) => void,
  deps?: DependencyList
): void => useEventListener('keydown', handler, deps)

type KeyMap = Pick<
  KeyboardEvent,
  'key' | 'metaKey' | 'code' | 'altKey' | 'ctrlKey' | 'shiftKey' | 'repeat'
>
const useShortcut = (
  keyMap: Partial<KeyMap>,
  handler: (ev: KeyboardEvent) => void,
  deps?: DependencyList
): void => {
  const { safeLogEvent } = useSafeLogEvent()

  const fn = (ev: KeyboardEvent): void => {
    const isValid = Object.entries(keyMap).every(
      ([key, value]) => ev[key as keyof KeyMap] === value
    )
    if (!isValid) return
    handler(ev)
    safeLogEvent((analytics, logEvent) => {
      const { code, metaKey, shiftKey, ctrlKey, key, altKey } = ev
      logEvent(analytics, 'shortcut', {
        code,
        metaKey,
        shiftKey,
        ctrlKey,
        key,
        altKey
      })
    })
  }

  useKeydown(fn, deps)
}

export { useEventListener, useKeydown, useShortcut }
