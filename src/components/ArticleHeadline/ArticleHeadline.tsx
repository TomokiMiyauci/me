import { FC, ReactChild } from 'react'
import ArticleHeadlineBody from '@/components/ArticleHeadline/ArticleHeadlineBody'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'

type CardType = 'none' | 'MMM' | 'no'

const detectType = ({
  MMM,
  no
}: Pick<ArticleHeadlineProps, 'MMM' | 'no'>): CardType => {
  if (!MMM && !no) {
    return 'none'
  }
  return !!MMM ? 'MMM' : 'no'
}

const typeClass = (type: Exclude<CardType, 'none'>) => {
  switch (type) {
    case 'MMM': {
      return 'transform rotate-180 px-2 pt-3 text-6xl md:text-7xl writing-mode-vertical'
    }

    case 'no': {
      return 'text-7xl text-right px-2'
    }
  }
}

const ArticleHeadline: FC<
  Omit<ArticleHeadlineProps, 'to' | 'alt' | 'img'> & {
    Img: ReactChild
  }
> = ({ Img, MMM, no, ...rest }) => {
  const type = detectType({ MMM, no })
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
      <div className="flex flex-col justify-between">
        {Img}
        {type !== 'none' && (
          <span
            className={`text-shadow group-hover:opacity-40 self-end transition-opacity duration-300 opacity-20 text-gray-400 dark:text-blue-gray-400  ${typeClass(
              type
            )}`}
          >
            {type === 'MMM' ? MMM : String(no).padStart(2, '0')}
          </span>
        )}
      </div>

      <ArticleHeadlineBody {...rest} />
    </article>
  )
}

export default ArticleHeadline
export type { ArticleHeadlineProps }
