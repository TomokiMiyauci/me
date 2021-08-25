import React, { FC, ReactChild } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import timerSand from '@iconify-icons/mdi/timer-sand'
import { useCommentCount } from './Comment/CommentCount/hooks'
import { handleClick } from './Comment/CommentCount/_util'
import { useLocalization } from 'gatsby-theme-i18n'
import { iconMeta } from '@/utils/tag'
import SnsShare from '@/components/SnsShare'
import Clap from '@/components/Clap'
import Tag from '@/components/Tag'
import Breadcrumb from '@/components/Breadcrumb'
import Pullrequest from '@/components/Pullrequest'
import ArticleDate from '@/components/ArticleDate'
import IconWith from '@/components/IconWith'
import CommentCounter from '@/components/Comment/CommentCount/CommentCounter'

interface ArticleProps {
  children: ReactChild
  title: string
  description: string
  hero: IGatsbyImageData
  relativePath: string
  dirName: string
  readingTime: string
  tags: string[]
  date: string
  modifiedDate: string
  isModified: boolean
  url: string
  editLink: string
}

const Article: FC<ArticleProps> = ({
  children,
  title,
  description,
  hero,
  relativePath,
  readingTime,
  tags,
  date,
  modifiedDate,
  isModified,
  dirName,
  url,
  editLink
}) => {
  const [commentCount, loading] = useCommentCount()
  const { locale } = useLocalization()
  return (
    <article itemScope itemType="http://schema.org/Article" className="mx-auto">
      <div className="container morph xl:px-24 mx-auto mb-10 relative text-gray-800">
        <Breadcrumb to={relativePath} title={title} />
        {locale === 'en' && (
          <Pullrequest className="mb-5 md:mb-6 -mx-4 sm:mx-0" href={editLink} />
        )}

        <div className="space-x-2 text-right my-2 md:space-x-4">
          <SnsShare title={title} url={url} />
        </div>

        <h1
          className="
          xl:text-9xl
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-8xl
          sm:py-1
          md:py-2
          mb-4
          text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500
        "
        >
          {title}
        </h1>

        <p
          className="
          xl:mt-10
          text-gray-500
          dark:text-gray-100
          sm:text-xl
          md:text-2xl
          xl:text-3xl
        "
        >
          {description}
        </p>

        <div className="flex items-center justify-between my-2">
          <div className="space-x-4">
            {tags.map((tag) => {
              const { tagIcon, wellKnown } = iconMeta(tag)

              return (
                <Tag
                  className={wellKnown ? '' : 'hidden md:inline-flex'}
                  key={tag}
                  tag={tagIcon}
                  label={tag}
                />
              )
            })}
          </div>
        </div>

        <div
          className="flex justify-center flex-wrap text-gray-500 dark:text-gray-100
space-x-2 sm:space-x-4 md:space-x-8 my-6"
        >
          <span className="flex items-center">
            <ArticleDate
              publishAt={date}
              modifiedAt={modifiedDate}
              isModified={isModified}
            />
          </span>
          <span className="flex items-center">
            <IconWith
              icon={timerSand}
              className="text-accent w-6 h-6 md:w-7 md:h-7"
            >
              <span className="md:text-xl">{readingTime}</span>
            </IconWith>
          </span>

          <a href="#comment" className="flex" onClick={handleClick}>
            <CommentCounter value={commentCount} loading={loading} />
          </a>

          <Clap slug={dirName} />
        </div>

        <GatsbyImage
          alt="hero image"
          className="rounded-md shadow"
          image={hero}
        />
      </div>

      {children}
    </article>
  )
}

export default Article
