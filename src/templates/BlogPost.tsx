import React, { FC, Fragment, useRef } from 'react'
import { graphql, PageProps } from 'gatsby'
import Article from '../components/Article'
import { BlogPostBySlugQuery } from '@/../graphql-types'
import ArticleHeadline from '../components/ArticleHeadline'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Seo from '../components/seo'
import { Helmet } from 'react-helmet'
import { useLocalization } from 'gatsby-theme-i18n'
import Toc from '../components/Toc'
import { Popover, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/offline'
import book from '@iconify-icons/mdi/book-open-page-variant-outline'
import ReadingProgress from '../components/ReadingProgress'
import { makeRepoPostPath } from '../utils/parser'
import icon from '@iconify-icons/mdi/pencil-box-multiple-outline'
import SnsShare from '@/components/SnsShare'
import Comment from '@/components/Comment'
import Newsletter from '@/components/Newsletter'
import chevronRight from '@iconify-icons/mdi/chevron-right'
import chevronLeft from '@iconify-icons/mdi/chevron-left'
import RelatedArticle from '@/components/RelatedArticle'
const BlogPostTemplate: FC<PageProps<BlogPostBySlugQuery>> = ({
  data,
  location
}) => {
  const { previous, next, mdx, recentArticles, sameTagArticles } = data

  const { frontmatter, body, tableOfContents, fields } = mdx || {
    frontmatter: { hero: {} },
    fields: {},
    items: []
  }

  const { isModified, gitAuthorTime, readingTime, lowerCaseTags, fullPath } =
    fields
  const { title, description, hero, date, slug } = frontmatter
  const { publicURL, childImageSharp } = hero
  const { locale } = useLocalization()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const editOnGitHub = makeRepoPostPath(slug, locale as 'en' | 'ja')

  return (
    <>
      <Seo
        title={title}
        description={description}
        fullpath={fullPath}
        imgUrl={publicURL}
      />

      <Helmet>
        <meta name="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {body ? (
        <>
          <Article
            title={title}
            description={description}
            hero={childImageSharp.gatsbyImageData}
            readingTime={readingTime.text}
            relativePath={location.pathname}
            url={fullPath}
            slug={slug}
            tags={lowerCaseTags}
            date={new Date(date).toLocaleDateString(locale)}
            modifiedDate={new Date(gitAuthorTime).toLocaleDateString(locale)}
            isModified={isModified}
            editLink={editOnGitHub}
          >
            <div className="container mx-auto flex flex-wrap ">
              <aside className="lg:w-1/5 xl:px-10 lg:pt-20 xl:pt-28">
                <ReadingProgress />
              </aside>

              <section
                className="mx-auto w-full prose lg:w-3/5"
                itemProp="articleBody"
              >
                <MDXRenderer>{body}</MDXRenderer>

                <a
                  className="text-accent space-x-1 underline md:no-underline hover:underline"
                  href={editOnGitHub}
                  target="_blank"
                >
                  <span>Edit this page on GitHub</span>
                  <Icon icon={icon} className="w-5 h-5" />
                </a>

                <div className="space-x-4 my-4">
                  <SnsShare title={title} url={fullPath} />
                </div>
              </section>

              <nav className="lg:w-1/5 pl-4">
                <Toc
                  className="sticky hidden lg:block rounded-md top-28 bg-gray-100  dark:bg-blue-gray-800"
                  toc={tableOfContents.items}
                />
              </nav>
            </div>
          </Article>

          <hr className="prose mx-auto my-10" />

          <div className="max-w-5xl mx-auto">
            <Newsletter />
          </div>

          <div className=" max-w-prose mx-auto my-10">
            <h3 className="text-3xl mb-6">Other Article</h3>

            <nav>
              <ul className="space-y-2 -mx-2">
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
                      img={
                        previous.frontmatter.thumbnail.childImageSharp
                          .gatsbyImageData
                      }
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
                      img={
                        next.frontmatter.thumbnail.childImageSharp
                          .gatsbyImageData
                      }
                      to={next.frontmatter.slug}
                      tags={next.fields.lowerCaseTags}
                      readingTime={next.fields.readingTime.text}
                      lastUpdated={next.frontmatter.date}
                      alt="next article thumbnail"
                    />
                  </li>
                )}
              </ul>

              <RelatedArticle
                recentArticles={recentArticles.nodes}
                sameTagArticles={sameTagArticles.nodes}
                tags={lowerCaseTags}
              />
            </nav>
          </div>

          <section className="max-w-prose -mx-4 md:mx-auto">
            <h3 id="comment" className="p-4 text-3xl md:p-0 md:mb-2">
              Comments
            </h3>
            <Comment />
          </section>

          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  ref={buttonRef}
                  title="Table of Contents"
                  className="fixed md:hidden bottom-2 p-2 shadow-xl border dark:border-blue-gray-700 bg-gray-100 dark:bg-blue-gray-800 rounded-full text-accent right-6"
                >
                  <Icon className="w-8 h-8" icon={book} />
                </Popover.Button>

                <Popover.Overlay className={`backdrop-blur-sm fixed inset-0`} />

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition duration-500 ease-out"
                  enterFrom="transform translate-y-full opacity-0"
                  enterTo="transform translate-y-0 opacity-100"
                  leave="transition duration-500 ease-out"
                  leaveFrom="transform translate-y-0"
                  leaveTo="transform translate-y-full"
                >
                  <Popover.Panel
                    as="aside"
                    className={`fixed backdrop-filter shadow backdrop-blur bg-gray-50 dark:bg-blue-gray-900 z-[2] rounded-t-3xl dark:border-blue-gray-700 border-t bottom-0 inset-x-0`}
                  >
                    <Toc toc={tableOfContents.items} />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </>
      ) : (
        <div className="container mx-auto">This page is not yet complete.</div>
      )}
    </>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $locale: String!
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
    $tags: [String!]!
  ) {
    mdx(
      fileAbsolutePath: { regex: "//posts//" }
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      fields {
        readingTime {
          text
        }
        lowerCaseTags
        gitAuthorTime
        isModified
        fullPath
      }
      tableOfContents
      frontmatter {
        title
        description
        date
        hero {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        date
        slug
      }
      body
    }
    recentArticles: allMdx(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        fields: { locale: { eq: $locale } }
        frontmatter: {
          slug: { nin: [$slug, $previousPostSlug, $nextPostSlug] }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 5
    ) {
      nodes {
        fields {
          readingTime {
            text
          }
          lowerCaseTags
        }
        frontmatter {
          title
          description
          date
          thumbnail {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1, layout: FIXED, width: 80)
            }
          }
          slug
        }
      }
    }
    sameTagArticles: allMdx(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        fields: { locale: { eq: $locale }, lowerCaseTags: { in: $tags } }
        frontmatter: {
          slug: { nin: [$slug, $previousPostSlug, $nextPostSlug] }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 5
    ) {
      nodes {
        fields {
          readingTime {
            text
          }
          lowerCaseTags
        }
        frontmatter {
          title
          description
          date
          thumbnail {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1, layout: FIXED, width: 80)
            }
          }
          slug
        }
      }
    }
    previous: mdx(
      fileAbsolutePath: { regex: "//posts//" }
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $previousPostSlug } }
    ) {
      fields {
        readingTime {
          text
        }
        lowerCaseTags
      }
      frontmatter {
        title
        description
        date
        thumbnail {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1, layout: FIXED, width: 80)
          }
        }
        slug
      }
    }
    next: mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $nextPostSlug } }
    ) {
      fields {
        readingTime {
          text
        }
        lowerCaseTags
      }
      frontmatter {
        title
        description
        date
        thumbnail {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1, layout: FIXED, width: 80)
          }
        }
        slug
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
