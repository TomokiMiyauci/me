import { FC, ReactChild, cloneElement, ReactElement, useMemo } from 'react'
import ArticleHeadlineBody from '@/components/ArticleHeadline/ArticleHeadlineBody'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'
import { classNames } from '@/utils/class_name'

const DEFAULT_AREA_CLASS_NAME =
  'absolute bottom-0 self-end text-shadow px-2 pt-3'

const ArticleHeadline: FC<
  Omit<ArticleHeadlineProps, 'to' | 'alt' | 'img'> & {
    Img: ReactChild
    defaultAreaClassName?: string
  }
> = ({
  Img,
  Area,
  defaultAreaClassName = DEFAULT_AREA_CLASS_NAME,
  ...rest
}) => {
  const _Area = useMemo<ReactElement | undefined>(() => {
    if (Area) {
      return cloneElement(Area, {
        className: classNames(Area.props.className, defaultAreaClassName)
      })
    }

    return Area
  }, [Area, defaultAreaClassName])

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
      <div className="relative flex flex-col justify-between">
        {Img}

        {_Area}
      </div>

      <ArticleHeadlineBody {...rest} />
    </article>
  )
}

export default ArticleHeadline
export type { ArticleHeadlineProps }
