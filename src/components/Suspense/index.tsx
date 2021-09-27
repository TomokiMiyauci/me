import { useState, useEffect, useRef } from 'react'
import { LoadableComponent } from '@loadable/component'
import type { FC, ReactElement } from 'react'
const Suspense: FC<{
  children: ReactElement<any, LoadableComponent<{}>>
  fallback: JSX.Element
  delay?: number
}> = ({ fallback, children, delay = 1000 }) => {
  const [show, setShow] = useState(false)
  const timeoutId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeoutId.current = setTimeout(async () => {
      await children.type?.load?.()
      setShow(true)
    }, delay)

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return show ? children : fallback
}

export default Suspense
