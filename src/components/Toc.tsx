import React, { FC } from 'react'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'

type Toc = { url: string; title: string; items?: Toc[] }

const Toc: FC<{ className?: string; toc: Toc[] }> = ({ className, toc }) => {
  const { locale } = useLocalization()
  return (
    <ul className="p-4">
      {toc.map(({ url, title, items }) => {
        return (
          <li key={url}>
            <LocalizedLink to={url} language={locale}>
              {title}
            </LocalizedLink>

            {items && (
              <ul className="ml-4">
                {items.map(({ url, title }) => (
                  <li key={url}>
                    <LocalizedLink to={url} language={locale}>
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
