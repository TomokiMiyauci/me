import React, { FC } from 'react'
import { BlogPostBySlugQuery } from '@/../graphql-types'
import chevronRight from '@iconify-icons/mdi/chevron-right'
import chevronLeft from '@iconify-icons/mdi/chevron-left'
import { Icon } from '@iconify/react/dist/offline'
import ArticleHeadline from '@/components/ArticleHeadline'

const Index: FC<{
  previous: BlogPostBySlugQuery['previous']
  next: BlogPostBySlugQuery['next']
  className?: string
}> = ({ previous, next, className }) => {
  return (
    <ul className={className}>
      {previous && (
        <li className="relative">
          <span className="absolute opacity-80 bottom-0 left-0 ">
            <Icon
              icon={chevronLeft}
              className="w-20 h-20 md:w-40 md:h-40 text-accent"
            />
          </span>

          <ArticleHeadline
            title={previous.frontmatter.title}
            description={previous.frontmatter.description}
            img={previous.frontmatter.thumbnail.childImageSharp.gatsbyImageData}
            to={previous.frontmatter.slug}
            readingTime={previous.fields.readingTime.text}
            lastUpdated={previous.frontmatter.date}
            tags={previous.fields.lowerCaseTags}
            alt="previous article thumbnail"
          />
        </li>
      )}
      {next && (
        <li className="relative">
          <span className="absolute opacity-80 bottom-0 right-0 ">
            <Icon
              icon={chevronRight}
              className="w-20 h-20 md:w-40 md:h-40 text-accent"
            />
          </span>
          <ArticleHeadline
            title={next.frontmatter.title}
            description={next.frontmatter.description}
            img={next.frontmatter.thumbnail.childImageSharp.gatsbyImageData}
            to={next.frontmatter.slug}
            tags={next.fields.lowerCaseTags}
            readingTime={next.fields.readingTime.text}
            lastUpdated={next.frontmatter.date}
            alt="next article thumbnail"
          />
        </li>
      )}
    </ul>
  )
}

export default Index
