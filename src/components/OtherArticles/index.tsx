import { FC } from 'react'
import { BlogPostBySlugQuery } from '@/../graphql-types'
import PrevNext from '@/components/PrevNext'
import RelatedArticle from '@/components/RelatedArticle'

type ArticlesMetaInfo = BlogPostBySlugQuery['allMdx']['nodes']

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
