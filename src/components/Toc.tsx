import React, { FC, MouseEventHandler } from 'react'
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
    }

  return (
    <div className={`p-3 ${className}`}>
      <h3 className="space-x-2 my-2 text-xl text-accent">
        <Icon icon={bookmarkMinusOutline} className="w-7 h-7" />
        <span>Table of Contents</span>
      </h3>
      <ul className="space-y-2 md:inset-x-2.5">
        {toc.map(({ url, title, items }) => {
          return (
            <li key={url}>
              <a onClick={handleClick(url)} className="block" href={url}>
                {title}
              </a>

              {items && (
                <ul className="ml-4 space-y-2">
                  {items.map(({ url, title }) => (
                    <li key={url}>
                      <a
                        onClick={handleClick(url)}
                        className="block"
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
