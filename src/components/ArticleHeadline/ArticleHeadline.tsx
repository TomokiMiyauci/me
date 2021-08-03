import React, { FC, ReactChild } from 'react'
import ArticleHeadlineBody from '@/components/ArticleHeadline/ArticleHeadlineBody'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'

const ArticleHeadline: FC<
  Omit<ArticleHeadlineProps, 'to' | 'alt' | 'img'> & { Img: ReactChild }
> = ({ Img, ...rest }) => {
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
      <div className="relative">{Img}</div>

      <ArticleHeadlineBody {...rest} />
    </article>
  )
}

export default ArticleHeadline
export type { ArticleHeadlineProps }
