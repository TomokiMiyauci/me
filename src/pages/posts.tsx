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
import { includes, toLowerCase } from 'core-fn'
import { isEmpty } from '@miyauci/is-valid'
import { navigate } from '@reach/router'
import { pipe } from 'fonction'
import { useEffect } from 'react'
import NotFoundQueryString from '@/components/NotFoundQueryString'
import magnify from '@iconify-icons/mdi/magnify'
import { Icon } from '@iconify/react'
import { iconMeta } from '@/utils/tag'

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
  const [selectedTag, changeTag] = useState<string>('')
  const [search, changeSearch] = useState<string>('')

  useEffect(() => {
    changeTag(new URLSearchParams(location.search).get('tag') ?? '')
  }, [])

  useEffect(() => {
    changeSearch(new URLSearchParams(location.search).get('q') ?? '')
  }, [])

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

  const filterByWord = useMemo(() => {
    if (isEmpty(search)) return nodes

    const searchIncludes = includes(search)
    const check = pipe(toLowerCase, searchIncludes)

    return nodes.filter(({ frontmatter }) => {
      const title = frontmatter?.title ?? ''
      const description = frontmatter?.description ?? ''

      return check(title) || check(description)
    })
  }, [search])

  const articles = useMemo(() => {
    if (isEmpty(selectedTag)) return filterByWord

    return filterByWord.filter(({ fields }) =>
      includes(selectedTag, fields.lowerCaseTags)
    )
  }, [filterByWord, selectedTag])

  const isSelecting = useMemo(
    () => (tag: string) => {
      return tag === selectedTag
    },
    [selectedTag]
  )

  const handleClick = (tag: string) => {
    const tagQuery = isEmpty(selectedTag) || selectedTag !== tag ? tag : ''

    changeTag(tagQuery)
  }

  useEffect(() => {
    const url = new URL(location.href)
    const urlSearchParams = new URLSearchParams(url.search)

    if (selectedTag) {
      urlSearchParams.set('tag', selectedTag)
    } else {
      urlSearchParams.delete('tag')
    }
    url.search = urlSearchParams.toString()
    navigate(url.href, { replace: true })
  }, [selectedTag])

  useEffect(() => {
    const url = new URL(location.href)

    const urlSearchParams = new URLSearchParams(url.search)
    if (search) {
      urlSearchParams.set('q', search)
    } else {
      urlSearchParams.delete('q')
    }
    url.search = urlSearchParams.toString()
    navigate(url.href, { replace: true })
  }, [search])

  console.log(11111)

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

      <section className="-mx-4 p-2 space-y-6 md:p-8 -mt-4 mb-4 md:-mt-7 heropattern-topography-gray-200 dark:heropattern-topography-gray-700 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl p-2 ">Blog</h1>

        <span className="rounded-full px-2 hover:shadow-md focus-within:ring ring-accent transition duration-300 py-0.5 space-x-2 shadow inline-flex bg-gray-100 dark:bg-blue-gray-900 border dark:border-blue-gray-700">
          <Icon icon={magnify} className="w-9 h-9 text-gray-500" />

          <input
            onChange={({ target }) => changeSearch(target.value)}
            value={search}
            type="search"
            spellCheck="false"
            placeholder="Search article"
            className="bg-transparent text-xl min-w-[260px]"
          />
        </span>

        <div className="max-w-5xl flex justify-center flex-wrap space-x-2">
          {group.map(({ fieldValue }) => {
            const { tagIcon, wellKnown } = iconMeta(fieldValue)
            if (!wellKnown) return
            return (
              <Tag
                className={`select-none cursor-pointer m-0.5 md:m-1 ${
                  isSelecting(fieldValue) ? 'ring ring-accent' : ''
                }`}
                hancleClick={() => handleClick(fieldValue)}
                key={fieldValue}
                tag={tagIcon}
                label={fieldValue}
              />
            )
          })}
        </div>
      </section>
      {isEmpty(articles) ? (
        <NotFoundQueryString
          className="my-12"
          query={search}
          tag={selectedTag}
        />
      ) : (
        <div className="container my-8 md:my-12 mx-auto">
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
      )}
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
