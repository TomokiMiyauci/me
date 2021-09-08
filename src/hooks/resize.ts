import { useEffect, useRef } from 'react'
import { useAsyncMemo } from 'use-async-memo'

const useResize = (ref?: Element, optimize: boolean = true) => {
  const _fn = useRef<EventListenerOrEventListenerObject>()
  const _target = useAsyncMemo(async () => {
    const { isBrowser } = await import('@/utils/environment')
    if (isBrowser) {
      return ref ?? window
    }
  }, [ref])

  const _setEvent = (): void => {
    if (!_fn.current || !_target) return
    _target.addEventListener('resize', _fn.current)
  }
  const _removeEvent = () => {
    if (!_fn.current || !_target) return
    _target.removeEventListener('resize', _fn.current)
  }

  useEffect(() => {
    _setEvent()

    return _removeEvent
  }, [_target, _fn.current])

  const onResize = (fn: EventListenerOrEventListenerObject) => {
    _removeEvent()
    _fn.current = fn
  }

  return {
    onResize
  }
}

export { useResize }
