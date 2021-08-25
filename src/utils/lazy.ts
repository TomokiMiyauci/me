import type { AnyFn } from 'fonction'
import { isBrowser } from '@/utils/environment'

const types = [
  'click',
  'mousedown',
  'keydown',
  'touchstart',
  'mousemove',
  'scroll'
] as const

const lazy = (fn: AnyFn): void => {
  const _fn = (): void => {
    fn()
    removeListeners()
  }
  const removeListeners = (): void => {
    types.forEach((type) => {
      removeEventListener(type, _fn)
    })
  }

  const addListeners = (): void => {
    types.forEach((type) => {
      addEventListener(type, _fn)
    })
  }

  if (isBrowser) {
    addListeners()
  }
}

export { lazy }
