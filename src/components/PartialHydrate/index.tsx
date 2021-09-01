import { useEffect, useRef, createElement } from 'react'
import { hydrate } from 'react-dom'
import type {
  FC,
  ReactElement,
  ReactHTML,
  DetailedHTMLProps,
  HTMLAttributes
} from 'react'

const isServer = typeof window === 'undefined'
const dataProps = { 'data-partial-hydrate': 'true' }

const PartialHydrate: FC<
  {
    children: ReactElement | ReactElement[]
    isStatic?: boolean
    as?: keyof ReactHTML
  } & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ children, isStatic = false, as = 'div', ...props }) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isStatic) return
    const observer = new IntersectionObserver(([entry], obs) => {
      if (!entry.isIntersecting) return

      if (ref.current) {
        obs.unobserve(ref.current)
        if (process.env.NODE_ENV !== 'development') {
          hydrate(children, ref.current)
        }
        console.log('render')
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return createElement(as, { ref, ...dataProps, ...props }, children)
  }

  if (isServer) {
    return createElement(as, { ...dataProps, ...props }, children)
  }

  return createElement(as, {
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: ''
    },
    ...dataProps,
    ...props
  })
}

export default PartialHydrate
