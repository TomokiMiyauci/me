import React, { FC } from 'react'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import { AnyFn } from 'fonction'
import { replace } from 'core-fn'

const linkFormat = replace('#', '')

type Toc = { url: string; title: string; items?: Toc[] }

const Toc: FC<{ className?: string; toc: Toc[]; onClickLink?: AnyFn }> = ({
  className,
  toc,
  onClickLink
}) => {
  const { locale } = useLocalization()

  const handleClick = (url: string) => (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const el = document.getElementById(linkFormat(url))
    const offset = innerWidth > 768 ? 112 : 56

    // if (el) {
    //   scroll({
    //     top: el.offsetTop - offset,
    //     behavior: 'smooth'
    //   })
    // }
    onClickLink?.()
  }

  return (
    <ul className={`p-4 space-y-2 md:inset-x-2.5 ${className}`}>
      {toc.map(({ url, title, items }) => {
        return (
          <li key={url}>
            <LocalizedLink
              onClick={handleClick(url)}
              className="block"
              to={url}
              language={locale}
            >
              {title}
            </LocalizedLink>

            {items && (
              <ul className="ml-4 space-y-2">
                {items.map(({ url, title }) => (
                  <li key={url}>
                    <LocalizedLink
                      onClick={handleClick(url)}
                      className="block"
                      to={url}
                      language={locale}
                    >
                      {title}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Toc
