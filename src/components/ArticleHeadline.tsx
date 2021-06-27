import React, { FC } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import { isLength0 } from '@miyauci/is-valid'
import Tag from './Tag'

const ArticleHeadline: FC<{
  title: string
  description: string
  img: IGatsbyImageData
  to: string
  alt: string
  tags: string[]
  lastUpdated?: number
  readingTime?: number
}> = ({ title, description, img, to, alt, lastUpdated, readingTime, tags }) => {
  const { locale } = useLocalization()
  return (
    <LocalizedLink
      to={to}
      language={locale}
      className="
      rounded-md
      hover:shadow-lg
      hover:scale-103
      md:hover:scale-105
      hover:bg-gray-50
      dark:hover:bg-blue-gray-800
      transition
      duration-500
      flex
      mb-4
      group
      transform
    "
    >
      <GatsbyImage
        className="m-2 sm:m-3 rounded overflow-visible"
        alt={alt}
        image={img}
      />

      <div className="p-1 sm:p-2 flex flex-1 space-y-2 flex-col justify-between">
        <div className="sm:space-y-1">
          <h2
            className="
            line-clamp-2
            transition
            duration-200
            text-xl
            text-accent
            sm:text-2xl
          "
          >
            {title}
          </h2>

          <p className="text-gray-600 dark:text-gray-200 line-clamp-2 md:line-clamp-3">
            {description}
          </p>
        </div>

        {!isLength0(tags) && (
          <div className="space-x-2">
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        )}

        {(lastUpdated || readingTime) && (
          <div className="time opacity-50 no-underline text-sm -mt-1">
            {lastUpdated && (
              <span className="mr-4 no-underline">
                {new Date(lastUpdated).toLocaleDateString()}
              </span>
            )}
            {readingTime && <span>{readingTime} min read</span>}
          </div>
        )}
      </div>
    </LocalizedLink>
  )
}

export default ArticleHeadline
