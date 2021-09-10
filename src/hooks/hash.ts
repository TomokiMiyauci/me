import { useState, useEffect, useMemo } from 'react'
import { isBrowser } from '@/utils/environment'

const safeReplaceHash = (val: string): void => {
  if ('history' in window) {
    window.history.replaceState(null, document.title, val)
  } else {
    window.location.hash = val
  }
}

const useHash = <T extends `#${string}`>(val: T) => {
  const [state, changeState] = useState<T>(() => {
    return isBrowser ? (window.location.hash as T) : ('' as T)
  })

  const changeHash = (hash?: T): void => changeState(hash ?? ('' as T))

  const isHashEqualVal = useMemo<boolean>(() => val === state, [state, val])
  const switchHash = (value: boolean): void =>
    changeHash(value ? (val as T) : ('' as T))

  useEffect(() => {
    if (state) {
      safeReplaceHash(val)
    } else {
      safeReplaceHash(' ')
    }
  }, [state])

  return [isHashEqualVal, switchHash] as const
}

export { useHash }
