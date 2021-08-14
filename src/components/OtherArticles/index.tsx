import React, { FC } from 'react'
import loadable from '@loadable/component'
import { BlogPostBySlugQuery } from '@/../graphql-types'

type ArticlesMetaInfo = BlogPostBySlugQuery['allMdx']['nodes']

const PrevNext = loadable(() => import('@/components/PrevNext'))
const RelatedArticle = loadable(() => import('@/components/RelatedArticle'))

const Index: FC<{
  className?: string
  previous: BlogPostBySlugQuery['previous']
  next: BlogPostBySlugQuery['next']
  recentArticles: ArticlesMetaInfo
  hotArticles: ArticlesMetaInfo
  sameTagArticles: ArticlesMetaInfo
  tags?: string[]
}> = ({
  className,
  previous,
  next,
  recentArticles,
  hotArticles,
  sameTagArticles,
  tags
}) => {
  return (
    <>
      <h3 className={`text-3xl ${className}`}>Other Article</h3>

      <nav>
        <PrevNext previous={previous} next={next} className="space-y-2 -mx-2" />

        <RelatedArticle
          recentArticles={recentArticles.nodes}
          hotArticles={hotArticles.nodes}
          sameTagArticles={sameTagArticles.nodes}
          tags={tags}
        />
      </nav>
    </>
  )
}

export default Index
