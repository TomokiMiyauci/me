import React, { FC, ReactChild } from 'react'
import Breadcrumb from './Breadcrumb'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Icon } from '@iconify/react'
import cached from '@iconify-icons/mdi/cached'
import timerSand from '@iconify-icons/mdi/timer-sand'
import Tag from './Tag'
import { isLength0 } from '@miyauci/is-valid'

interface ArticleProps {
  children: ReactChild
  title: string
  description: string
  hero: IGatsbyImageData
  relativePath: string
  timeToRead: number
  tags: string[]
  date: string
}

const Article: FC<ArticleProps> = ({
  children,
  title,
  description,
  hero,
  relativePath,
  timeToRead,
  tags,
  date
}) => {
  return (
    <article itemScope itemType="http://schema.org/Article" className="mx-auto">
      <div className="container xl:px-24 mx-auto mb-10 text-gray-800">
        <Breadcrumb to={relativePath} title={title} />
        <h1
          className="
          xl:text-9xl
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-8xl
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

        {!isLength0(tags) && (
          <p className="my-2 space-x-4">
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </p>
        )}

        <div
          className="flex justify-center text-gray-500 dark:text-gray-100
space-x-6 my-6"
        >
          <span className="space-x-2 flex items-center">
            <Icon className="text-accent" icon={cached} />
            <span>{date}</span>
          </span>
          <span v-if="readingTime" className="space-x-2 flex items-center">
            <Icon className="text-accent" icon={timerSand} />
            <span>{timeToRead} min</span>
          </span>
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
