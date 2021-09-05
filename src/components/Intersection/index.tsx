import { useRef, useState, useEffect, useMemo, createElement } from 'react'
import type {
  FC,
  ReactElement,
  ReactHTML,
  DetailedHTMLProps,
  HTMLAttributes
} from 'react'

const Index: FC<
  {
    children: ReactElement | ReactElement[]
    as?: keyof ReactHTML
    keepRender?: boolean
    bottom?: boolean
  } & IntersectionObserverInit &
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({
  children,
  as = 'div',
  keepRender = false,
  bottom = false,
  root,
  rootMargin,
  threshold,
  ...props
}) => {
  const [isShow, setShow] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setShow(true)
          if (keepRender && ref.current) {
            obs.unobserve(ref.current)
          }
        } else {
          setShow(false)
        }
      },
      { root, rootMargin, threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [keepRender, root, rootMargin, threshold])

  const components = useMemo<JSX.Element>(() => {
    return bottom ? (
      <>
        {isShow && children}
        {createElement(as, { ref, ...props })}
      </>
    ) : (
      <>
        {createElement(as, { ref, ...props })}
        {isShow && children}
      </>
    )
  }, [children, as, bottom, ref.current, props])

  return components
}

export default Index
