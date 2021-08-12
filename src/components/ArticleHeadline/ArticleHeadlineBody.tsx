import React, { FC } from 'react'
import { isLength0, isString } from '@/utils/is'
import Tag from '@/components/Tag'
import { iconMeta } from '@/utils/tag'
import { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'

const ArticleHeadlineBody: FC<
  Omit<ArticleHeadlineProps, 'img' | 'to' | 'alt'>
> = ({ title, description, lastUpdated, readingTime, tags }) => {
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
              const name = isString(tag) ? tag : tag.name
              const className = isString(tag) ? '' : tag.className
              const { tagIcon, wellKnown } = iconMeta(name)
              return (
                <li className="inline" key={name}>
                  <Tag
                    className={`transition duration-300  ${
                      wellKnown ? '' : 'hidden md:inline-flex'
                    } ${className}`}
                    tag={tagIcon}
                    label={name}
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

export default ArticleHeadlineBody
