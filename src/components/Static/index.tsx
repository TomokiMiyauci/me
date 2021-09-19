import { useEffect, useRef, Fragment, createElement } from 'react'
import { hydrate } from 'react-dom'
import type { ReactNode, CSSProperties, ReactHTML } from 'react'

const isBrowser = typeof window !== 'undefined'
const display: CSSProperties['display'] = 'contents'
const DEFAULT_PROPS = {
  suppressHydrationWarning: true,
  dangerouslySetInnerHTML: {
    __html: ''
  }
}

type Props<T extends keyof ReactHTML> = {
  children: ReactNode
  fallback?: boolean | ReactNode
  as?: T
  onFallback?: () => void
}

const Static = <T extends keyof ReactHTML>({
  children,
  fallback = true,
  as,
  onFallback
}: Props<T>) => {
  const ref = useRef<HTMLDivElement>(null)
  const _as = as ?? 'div'

  useEffect(() => {
    if (!ref.current || !ref.current.innerHTML) {
      if (fallback) {
        const component = typeof fallback === 'boolean' ? children : fallback

        hydrate(createElement(Fragment, {}, component), ref.current)
        onFallback?.()
      }
    }
  }, [])

  if (!isBrowser)
    return createElement(
      _as,
      {
        style: {
          display
        }
      },
      children
    )

  return createElement(_as, {
    ...DEFAULT_PROPS,
    ref,
    style: {
      display
    }
  })
}

export default Static
