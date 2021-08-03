import React, { FC, ReactChild } from 'react'
import ArticleHeadlineBody from '@/components/ArticleHeadline/ArticleHeadlineBody'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'

const ArticleHeadline: FC<
  Omit<ArticleHeadlineProps, 'to' | 'alt' | 'img'> & {
    Img: ReactChild
  }
> = ({ Img, MMM, ...rest }) => {
  return (
    <article
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
      <div className="relative">
        {Img}
        {MMM && (
          <span
            className="absolute bottom-3 transform  group-hover:opacity-40 transition-opacity duration-300 rotate-180 text-shadow rounded right-1 opacity-20 text-gray-400 dark:text-blue-gray-400 text-6xl md:text-7xl writing-mode-vertical"
            style={{
              writingMode: 'vertical-lr'
            }}
          >
            {MMM}
          </span>
        )}
      </div>

      <ArticleHeadlineBody {...rest} />
    </article>
  )
}

export default ArticleHeadline
export type { ArticleHeadlineProps }
