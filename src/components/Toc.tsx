import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react'
import { AnyFn } from 'fonction'
import { replace } from 'core-fn'
import bookmarkMinusOutline from '@iconify-icons/mdi/bookmark-minus-outline'
import { Icon } from '@iconify/react'

const linkFormat = replace('#', '')

type Toc = { url: string; title: string; items?: Toc[] }

const Toc: FC<{ className?: string; toc: Toc[]; onClickLink?: AnyFn }> = ({
  className,
  toc,
  onClickLink
}) => {
  const [activeIndex, changeActiveIndex] = useState('')
  const ul = useRef<HTMLUListElement>(null)

  const handleClick =
    (url: string): MouseEventHandler =>
    (e) => {
      e.preventDefault()

      const el = document.getElementById(linkFormat(url))
      const offset = innerWidth > 768 ? 112 : 56

      if (el) {
        scroll({
          top: el.offsetTop - offset,
          behavior: 'smooth'
        })
      }
      onClickLink?.()
      setTimeout(() => {
        changeActiveIndex(url)
      }, 600)
    }

  useEffect(() => {
    const headings = document.querySelectorAll('section > h2, h3')

    const observer = new IntersectionObserver(
      (entry) => {
        entry.forEach((intersectionObserverEntry) => {
          if (!intersectionObserverEntry.isIntersecting) return
          changeActiveIndex(`#${intersectionObserverEntry.target.id}`)
        })
      },
      {
        rootMargin: '-50% 0px'
      }
    )

    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading)
      }
    })

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  return (
    <div className={`p-3 ${className}`}>
      <h3 className="space-x-2 my-2 text-xl text-accent">
        <Icon icon={bookmarkMinusOutline} className="w-7 h-7" />
        <span>Table of Contents</span>
      </h3>
      <ul ref={ul} className="space-y-2 md:inset-x-2.5">
        {toc.map(({ url, title, items }) => {
          return (
            <li key={url}>
              <a
                onClick={handleClick(url)}
                className={`hover:translate-x-2 transform delay-100 duration-500 transition-transform block ${
                  activeIndex === url ? 'text-accent' : ''
                } `}
                href={url}
              >
                {title}
              </a>

              {items && (
                <ul className="ml-4 space-y-2">
                  {items.map(({ url, title }) => (
                    <li key={url}>
                      <a
                        onClick={handleClick(url)}
                        className={`hover:translate-x-2 delay-100 transform duration-500 transition-transform block ${
                          activeIndex === url ? 'text-accent' : ''
                        } `}
                        href={url}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Toc
