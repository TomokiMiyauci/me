import { useState, useEffect, useRef } from 'react'
import { scrollInfoEvent } from '@/utils/scroll'

const useScrollShower = (init?: boolean) => {
  const [isShow, changeShow] = useState(init ?? false)
  const hasRegistered = useRef(false)
  const fn = scrollInfoEvent(({ direction, diff }) => {
    if (diff > 20 && direction === 'up') {
      changeShow(true)
    } else if (diff > 20 && direction === 'down') {
      changeShow(false)
    }
  })

  const register = (): void => {
    if (hasRegistered.current) return

    hasRegistered.current = true
    addEventListener('scroll', fn)
  }
  const unregister = (): void => {
    if (hasRegistered.current) {
      removeEventListener('scroll', fn)
      hasRegistered.current = false
    }
  }

  useEffect(() => {
    register()

    return unregister
  }, [])

  return { isShow, register, unregister }
}

export { useScrollShower }
