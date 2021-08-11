import React, { FC, useMemo } from 'react'
import RelatedArticle from '@/components/RelatedArticle/RelatedArticle'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'
import type { BlogPostBySlugQuery } from '@/../graphql-types'
import { isString } from '@miyauci/is-valid'

type ArticlesMetaInfo = BlogPostBySlugQuery['allMdx']['nodes']

const flatArticleMetaInfo =
  (alt: string) =>
  ({ frontmatter, fields }: ArticlesMetaInfo[number]): ArticleHeadlineProps => {
    const { title, description, thumbnail, slug, date } = frontmatter!
    const { readingTime, lowerCaseTags, dateByMMM } = fields!

    return {
      title: title!,
      description: description!,
      img: thumbnail!.childImageSharp?.gatsbyImageData,
      to: slug!,
      alt,
      lastUpdated: date,
      readingTime: readingTime?.text!,
      tags: lowerCaseTags!,
      MMM: dateByMMM
    }
  }

const Index: FC<{
  recentArticles: ArticlesMetaInfo
  hotArticles: ArticlesMetaInfo
  sameTagArticles: ArticlesMetaInfo
  tags?: string[]
}> = ({ recentArticles, sameTagArticles, hotArticles, tags = [] }) => {
  const _recentArticles = useMemo<ArticleHeadlineProps[]>(
    () => recentArticles.map(flatArticleMetaInfo('recent article image')),
    [recentArticles]
  )

  const _hotArticles = useMemo<ArticleHeadlineProps[]>(
    () => hotArticles.map(flatArticleMetaInfo('hot article image')),
    [hotArticles]
  )

  const _sameTagArticles = useMemo<ArticleHeadlineProps[]>(
    () =>
      sameTagArticles
        .map(flatArticleMetaInfo('same tag article image'))
        .map((tagArticles) => {
          if (!tagArticles) return tagArticles

          const _t = tagArticles.tags.map((_tag) => {
            const __tag =
              isString(_tag) && tags.includes(_tag)
                ? {
                    name: _tag,
                    className: 'ring-1 ring-accent'
                  }
                : _tag

            return __tag
          })

          return { ...tagArticles, tags: _t }
        }),
    [sameTagArticles]
  )

  return (
    <RelatedArticle
      recentArticles={_recentArticles}
      hotArticles={_hotArticles}
      sameTagArticles={_sameTagArticles}
      tags={tags}
    />
  )
}

export default Index
