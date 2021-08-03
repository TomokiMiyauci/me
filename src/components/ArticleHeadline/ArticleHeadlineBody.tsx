import React, { FC } from 'react'
import { isLength0 } from '@miyauci/is-valid'
import Tag from '@/components/Tag'
import { iconMeta } from '@/utils/tag'
import { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'

const ArticleHeadline: FC<Omit<ArticleHeadlineProps, 'img' | 'to' | 'alt'>> = ({
  title,
  description,
  lastUpdated,
  readingTime,
  tags
}) => {
  return (
    <>
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
          <ul className="space-x-2">
            {tags.map((tag) => {
              const { tagIcon, wellKnown } = iconMeta(tag)
              return (
                <li className="inline" key={tag}>
                  <Tag
                    className={wellKnown ? '' : 'hidden md:inline-flex'}
                    tag={tagIcon}
                    label={tag}
                  />
                </li>
              )
            })}
          </ul>
        )}

        {(lastUpdated || readingTime) && (
          <div className="time opacity-50 no-underline text-sm -mt-1">
            {lastUpdated && (
              <span className="mr-4 no-underline">{lastUpdated}</span>
            )}
            {readingTime && <span>{readingTime}</span>}
          </div>
        )}
      </div>
    </>
  )
}

export default ArticleHeadline
