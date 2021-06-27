import React, { FC, Fragment, useRef } from 'react'
import { graphql, PageProps } from 'gatsby'
import Article from '../components/Article'
import { BlogPostBySlugQuery } from '../../graphql-types'
import ArticleHeadline from '../components/ArticleHeadline'
import Layout from '../components/Layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Seo from '../components/seo'
import { Helmet } from 'react-helmet'
import { useLocalization } from 'gatsby-theme-i18n'
import Toc from '../components/Toc'
import { Popover, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import book from '@iconify-icons/mdi/book-open-page-variant-outline'

const BlogPostTemplate: FC<PageProps<BlogPostBySlugQuery>> = ({
  data,
  location,
  pageContext
}) => {
  const {
    previous,
    next,
    mdx,
    site: { siteMetadata }
  } = data

  const { frontmatter, body, timeToRead, tableOfContents } = mdx || {
    frontmatter: { hero: {} },
    items: []
  }
  const { title, description, hero, date, tags } = frontmatter
  const { publicURL, childImageSharp } = hero
  const fullpath = new URL(location.pathname, siteMetadata.siteUrl).toString()
  const { locale } = useLocalization()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const handleCloseToc = () => {
    buttonRef.current?.click()
  }

  return (
    <Layout originalPath={pageContext.originalPath}>
      <Seo
        title={title}
        description={description}
        fullpath={fullpath}
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
            timeToRead={timeToRead}
            relativePath={location.pathname}
            tags={tags ?? []}
            date={new Date(date).toLocaleDateString(locale)}
          >
            <div className="container mx-auto flex flex-wrap ">
              <aside className="lg:w-1/5" />
              <section
                className="mx-auto w-full prose lg:w-3/5"
                itemProp="articleBody"
              >
                <MDXRenderer>{body}</MDXRenderer>
              </section>

              <nav className="lg:w-1/5 pl-4">
                <Toc
                  className="sticky hidden lg:block rounded-md top-28 bg-gray-100  dark:bg-blue-gray-800"
                  toc={tableOfContents.items}
                />
              </nav>
            </div>
          </Article>

          <hr className="prose mx-auto mt-4" />

          <div className=" max-w-prose mx-auto my-10">
            <h3 className="text-3xl mb-6">Other Article</h3>

            <nav>
              <ul className="space-y-2 -mx-2">
                {previous && (
                  <li>
                    <ArticleHeadline
                      title={previous.frontmatter.title}
                      description={previous.frontmatter.description}
                      img={
                        previous.frontmatter.thumbnail.childImageSharp
                          .gatsbyImageData
                      }
                      to={previous.frontmatter.slug}
                      readingTime={previous.timeToRead}
                      lastUpdated={previous.frontmatter.date}
                      tags={[]}
                      alt="previous article thumbnail"
                    />
                  </li>
                )}
                {next && (
                  <li>
                    <ArticleHeadline
                      title={next.frontmatter.title}
                      description={next.frontmatter.description}
                      img={
                        next.frontmatter.thumbnail.childImageSharp
                          .gatsbyImageData
                      }
                      to={next.frontmatter.slug}
                      tags={[]}
                      readingTime={next.timeToRead}
                      lastUpdated={next.frontmatter.date}
                      alt="next article thumbnail"
                    />
                  </li>
                )}
              </ul>
            </nav>
          </div>

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
                    <Toc
                      onClickLink={handleCloseToc}
                      toc={tableOfContents.items}
                    />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </>
      ) : (
        <div className="container mx-auto">This page is not yet complete.</div>
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $locale: String!
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
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
        tags
        date
        slug
      }
      body
      timeToRead
    }
    previous: mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $previousPostSlug } }
    ) {
      timeToRead
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
      timeToRead
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
