import React, { FC, useState } from 'react'
import { PageProps, graphql } from 'gatsby'
import { BlogPostsQuery } from '../../graphql-types'
import ArticleHeadline from '../components/ArticleHeadline'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import { Helmet } from 'react-helmet'
import Newsletter from '@/components/Newsletter'
import { useMemo } from 'react'
import Tag from '@/components/Tag'
import { includes } from 'core-fn'
import { isEmpty } from '@miyauci/is-valid'

const Posts: FC<PageProps<BlogPostsQuery>> = (a) => {
  const {
    data,
    pageContext: { originalPath, locale },
    location
  } = a
  const {
    allMdx,
    site: { siteMetadata }
  } = data
  const { siteUrl } = siteMetadata
  const [selectedTag, selectTag] = useState<string>('')

  const p = locale === 'en' ? '/' : '/ja'

  const fullpath = new URL(location.pathname, siteUrl).toString()

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: new URL(p, siteUrl)
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: fullpath
      }
    ]
  }

  const { nodes, group } = allMdx

  const articles = useMemo(() => {
    if (isEmpty(selectedTag)) return nodes

    return nodes.filter(({ fields }) =>
      includes(selectedTag, fields.lowerCaseTags)
    )
  }, [selectedTag])
  const isSelecting = useMemo(
    () => (tag: string) => tag === selectedTag,
    [selectedTag]
  )

  return (
    <Layout originalPath={originalPath} currentPath={location.pathname}>
      <Seo
        title="Blog"
        description="Tomoki Miyauchi's technical blog. Mainly aim to disseminate technical and useful information such as information on the latest technology related to the Web and introduction of what was created as a project. I will send live information with a lot of actual code."
        fullpath={fullpath}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>

        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <section className="-mx-4 p-2  md:p-8 -mt-4 mb-4 md:-mt-7 heropattern-topography-gray-200 dark:heropattern-topography-gray-700 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl p-6 md:p-12 ">Blog</h1>

        <div className="max-w-5xl flex justify-center flex-wrap space-x-2">
          {group.map(({ fieldValue }) => {
            return (
              <Tag
                className={`cursor-pointer m-0.5 md:m-1 ${
                  isSelecting(fieldValue) ? 'ring ring-accent' : ''
                }`}
                hancleClick={() => {
                  console.log(selectTag !== fieldValue)
                  selectTag(
                    isEmpty(selectedTag) || selectedTag !== fieldValue
                      ? fieldValue
                      : ''
                  )
                }}
                key={fieldValue}
                tag={fieldValue}
              />
            )
          })}
        </div>
      </section>
      <div className="container my-4 md:my-12 mx-auto">
        <ul className="mx-auto md:grid md:grid-cols-2 md:gap-14 max-w-5xl">
          {articles.map(
            ({
              frontmatter: { title, thumbnail, description, date, slug },
              fields
            }) => (
              <li className="-mx-2 md:mx-auto" key={slug}>
                <ArticleHeadline
                  title={title}
                  description={description}
                  to={slug}
                  img={thumbnail.childImageSharp.gatsbyImageData}
                  readingTime={fields.readingTime.text}
                  lastUpdated={date}
                  tags={fields.lowerCaseTags}
                  alt="thumbnail"
                />
              </li>
            )
          )}
        </ul>
      </div>

      <Newsletter />
    </Layout>
  )
}

export default Posts

export const query = graphql`
  query BlogPosts($locale: String!) {
    allMdx(
      filter: { fields: { locale: { eq: $locale } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      group(field: fields___lowerCaseTags) {
        totalCount
        fieldValue
      }
      nodes {
        frontmatter {
          title
          description
          date
          thumbnail {
            childImageSharp {
              gatsbyImageData(layout: FIXED, aspectRatio: 1, width: 80)
            }
          }
          slug
        }
        fields {
          readingTime {
            text
          }
          lowerCaseTags
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
