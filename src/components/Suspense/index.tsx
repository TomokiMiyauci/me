import { useState, useEffect } from 'react'
import type { FC } from 'react'
const Suspense: FC<{
  children: JSX.Element
  fallback: JSX.Element
  delay?: number
}> = ({ fallback, children, delay = 1000 }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, delay)
  }, [])

  return show ? children : fallback
}

export default Suspense
