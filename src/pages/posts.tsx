import React, { FC } from 'react'
import { PageProps, graphql } from 'gatsby'
import { BlogPostsQuery } from '../../graphql-types'
import ArticleHeadline from '@/components/ArticleHeadline'
import Seo from '../components/seo'
import { Helmet } from 'react-helmet'
import Newsletter from '@/components/Newsletter'
import { useMemo } from 'react'
import Tag from '@/components/Tag'
import { includes, toLowerCase } from 'core-fn'
import { isEmpty } from '@miyauci/is-valid'
import { pipe } from 'fonction'
import NotFoundQueryString from '@/components/NotFoundQueryString'
import magnify from '@iconify-icons/mdi/magnify'
import { Icon } from '@iconify/react/dist/offline'
import { iconMeta } from '@/utils/tag'
import { useQueryString } from '@/hooks/location'
import burstNew from '@iconify-icons/foundation/burst-new'
import fire from '@iconify-icons/mdi/fire'
import { inc } from 'fonction'
import GoogleAdsense from '@/components/GoogleAdsense'

type Order = 'recent' | 'hot'

const Posts: FC<PageProps<BlogPostsQuery>> = (props) => {
  const {
    data,
    pageContext: { locale },
    location
  } = props
  const {
    recent,
    hot,
    site: { siteMetadata }
  } = data
  const { siteUrl } = siteMetadata

  const [search, changeSearch] = useQueryString('q', location)
  const [selectedTag, changeTag] = useQueryString('tag', location)
  const [order, changeOrder] = useQueryString<Order>('order', location)
  const { nodes, group } = recent

  const mapOrder = useMemo(() => {
    switch (order) {
      case 'recent': {
        return nodes
      }

      case 'hot': {
        return hot.nodes
      }

      default: {
        return nodes
      }
    }
  }, [order])

  const localePath = locale === 'en' ? '/' : '/ja'

  const fullPath = new URL(location.pathname, siteUrl).toString()

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: new URL(localePath, siteUrl)
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: fullPath
      }
    ]
  }

  const filterByWord = useMemo(() => {
    if (isEmpty(search)) return mapOrder

    const searchIncludes = includes(search)
    const check = pipe(toLowerCase, searchIncludes)

    return mapOrder.filter(({ frontmatter }) => {
      const title = frontmatter?.title ?? ''
      const description = frontmatter?.description ?? ''

      return check(title) || check(description)
    })
  }, [search, mapOrder])

  const articles = useMemo(() => {
    if (isEmpty(selectedTag)) return filterByWord

    return filterByWord.filter(({ fields }) =>
      includes(selectedTag, fields.lowerCaseTags)
    )
  }, [filterByWord, selectedTag])

  const isSelecting = (tag: string): boolean => {
    return tag === selectedTag
  }

  const handleClick = (tag: string) => {
    const tagQuery = isEmpty(selectedTag) || selectedTag !== tag ? tag : ''

    changeTag(tagQuery)
  }

  return (
    <>
      <Seo
        title="Blog"
        description="Tomoki Miyauchi's technical blog. Mainly aim to disseminate technical and useful information such as information on the latest technology related to the Web and introduction of what was created as a project. I will send live information with a lot of actual code."
        fullPath={fullPath}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>

        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <section className="-mx-4 p-2 space-y-6 md:p-8 -mt-4 md:-mt-7 heropattern-jupiter-gray-200 dark:heropattern-jupiter-gray-700 flex flex-col justify-center items-center">
        <h1 className="text-center text-5xl p-2 ">Blog</h1>

        <span className="rounded-full px-2 hover:shadow-md focus-within:ring ring-accent transition duration-300 py-0.5 space-x-2 shadow inline-flex bg-gray-100 dark:bg-blue-gray-900 border dark:border-blue-gray-700">
          <Icon icon={magnify} className="w-9 h-9 text-gray-500" />

          <input
            onChange={({ target }) => {
              changeSearch(target.value)
            }}
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

            const className = isSelecting(fieldValue) ? 'ring ring-accent' : ''
            return (
              <Tag
                className={`select-none cursor-pointer m-0.5 md:m-1 ${className}`}
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
        <div className="flex max-w-max lg:flex-row flex-col space-y-4 lg:space-y-0  mx-auto">
          <ul className="mx-auto min-h-[60vh] order-2 my-4 flex-1 md:grid md:grid-cols-2 md:gap-14 lg:px-4 max-w-5xl">
            {articles.map(
              (
                {
                  frontmatter: { title, thumbnail, description, date, slug },
                  fields
                },
                i
              ) => {
                const index = inc(i)
                return (
                  <li className="-mx-2 md:mx-auto min-w-[250px]" key={slug}>
                    <ArticleHeadline
                      title={title}
                      description={description}
                      to={slug}
                      img={thumbnail.childImageSharp.gatsbyImageData}
                      readingTime={fields.readingTime.text}
                      lastUpdated={date}
                      tags={fields.lowerCaseTags}
                      alt="thumbnail"
                      no={index <= 10 ? index : undefined}
                      MMM={fields.dateByMMM}
                    />
                  </li>
                )
              }
            )}
          </ul>

          <div className="min-w-[200px] lg:py-6 lg:px-2 order-1 sticky top-1 md:top-[5.5rem] bg-gray-50 dark:bg-blue-gray-900 xl:min-w-[250px]">
            <div className="sticky top-24">
              <div
                className="flex lg:flex-col space-x-1 lg:space-x-0 lg:space-y-1 overflow-x-scroll justify-around flex-nowrap p-1 bg-gray-200/50 dark:bg-blue-gray-800 rounded-xl"
                role="tablist"
              >
                <button
                  onClick={() => changeOrder('recent')}
                  className={`w-full p-1 space-x-2 whitespace-nowrap font-medium rounded-lg transition duration-300 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-accent ring-white dark:ring-blue-gray-900 hover:bg-opacity-50 ${
                    ['recent', ''].includes(order)
                      ? 'bg-white dark:bg-blue-gray-900 shadow text-accent'
                      : 'hover:bg-white/80 dark:hover:bg-blue-gray-900/80 hover:text-accent'
                  }`}
                  role="tab"
                >
                  <Icon icon={burstNew} className="w-7 h-7" />

                  <span className="align-middle">Recent</span>
                </button>

                <button
                  onClick={() => changeOrder('hot')}
                  className={`w-full p-1 space-x-2 whitespace-nowrap font-medium rounded-lg transition duration-300 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-accent ring-white dark:ring-blue-gray-900 hover:bg-opacity-50 ${
                    ['hot'].includes(order)
                      ? 'bg-white dark:bg-blue-gray-900 shadow text-accent'
                      : 'hover:bg-white/80 dark:hover:bg-blue-gray-900/80 hover:text-accent'
                  }`}
                  role="tab"
                >
                  <Icon icon={fire} className="w-7 h-7" />

                  <span className="align-middle">Hot</span>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden xl:block order-3 xl:min-w-[250px]">
            <GoogleAdsense
              className="hidden xl:block"
              dataAdFormat="auto"
              dataAdSlot="4829036417"
              dataFullWidthResponsive="true"
            />
          </div>
        </div>
      )}
      <Newsletter />
    </>
  )
}

export default Posts

export const query = graphql`
  query BlogPosts($locale: String!, $dateFormat: String!) {
    recent: allMdx(
      filter: {
        fields: { locale: { eq: $locale } }
        fileAbsolutePath: { regex: "//posts//" }
      }
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
          date(formatString: $dateFormat)
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
          dateByMMM
        }
      }
    }
    hot: allMdx(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        fields: { locale: { eq: $locale } }
      }
      sort: { fields: fields___view, order: DESC }
    ) {
      nodes {
        fields {
          readingTime {
            text
          }
          lowerCaseTags
          view
        }
        frontmatter {
          title
          description
          date(formatString: $dateFormat)
          thumbnail {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1, layout: FIXED, width: 80)
            }
          }
          slug
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
