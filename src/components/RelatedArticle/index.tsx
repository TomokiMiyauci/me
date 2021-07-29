import React, { FC, useMemo } from 'react'
import RelatedArticle from '@/components/RelatedArticle/RelatedArticle'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline'
import type { BlogPostBySlugQuery } from '@/../graphql-types'

const Index: FC<{ articles: BlogPostBySlugQuery['allMdx']['nodes'] }> = ({
  articles
}) => {
  const formattedArticle = useMemo<ArticleHeadlineProps[]>(() => {
    return articles.map(({ fields, frontmatter }) => {
      const { title, description, thumbnail, slug, date } = frontmatter!
      const { readingTime, lowerCaseTags } = fields!

      return {
        title: title!,
        description: description!,
        img: thumbnail!.childImageSharp?.gatsbyImageData,
        to: slug!,
        alt: `${title} slug image`,
        lastUpdated: date,
        readingTime: readingTime?.text!,
        tags: lowerCaseTags!
      }
    })
  }, [articles])
  return <RelatedArticle articles={formattedArticle} />
}

export default Index
