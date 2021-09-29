import type { Maybe } from '@/types/generics'
const makeEventListenerSet = <K extends keyof WindowEventMap>(
  target: Maybe<Window & typeof globalThis>,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any
): {
  register: () => void
  unregister: () => void
} => {
  const register = (): void => {
    if (target) {
      target.addEventListener(type, listener)
    }
  }
  const unregister = (): void => {
    if (target) {
      target.removeEventListener(type, listener)
    }
  }

  return {
    register,
    unregister
  }
}

export { makeEventListenerSet }
