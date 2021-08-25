import { useEffect } from 'react'
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

const useLazy = (fn: AnyFn) => {
  useEffect(() => {
    addListeners(fn).then((_fn) => {
      removeListeners(_fn)
    })
  }, [])
}

const removeListeners = (fn: AnyFn): void => {
  types.forEach((type) => {
    removeEventListener(type, fn)
  })
}

const addListeners = (fn: AnyFn): Promise<AnyFn> => {
  return new Promise((resolve) => {
    const _fn = () => {
      fn()
      resolve(_fn)
    }
    types.forEach((type) => {
      addEventListener(type, _fn)
    })
  })
}

const lazy = (fn: AnyFn): void => {
  const _fn = (): void => {
    fn()
    removeListeners(_fn)
  }

  if (isBrowser) {
    addListeners(_fn)
  }
}

export { lazy, useLazy }
