import { FC, Fragment, useRef } from 'react'
import { graphql, PageProps } from 'gatsby'
import { BlogPostBySlugQuery } from '@/../graphql-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Helmet } from 'react-helmet'
import { useLocalization } from 'gatsby-theme-i18n'
import { Popover } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/offline'
import book from '@iconify-icons/mdi/book-open-page-variant-outline'
import { makeRepoPostPath } from '@/utils/parser'
import icon from '@iconify-icons/mdi/pencil-box-multiple-outline'
import GoogleAdsense from '@/components/GoogleAdsense'
import SnsShare from '@/components/SnsShare'
import Comment from '@/components/Comment'
import VerificationEnv from '@/components/VerificationEnv'
import Toc from '@/components/Toc'
import ReadingProgress from '@/components/ReadingProgress'
import Article from '@/components/Article'
import MdxProvider from '@/components/MdxProvider'
import OtherArticles from '@/components/OtherArticles'
import Seo from '@/components/seo'
import loadable from '@loadable/component'
import Intersection from '@/components/Intersection'

const Subscribe = loadable(() => import('@/components/Subscribe'))
import { Transition } from '@headlessui/react'

const BlogPostTemplate: FC<PageProps<BlogPostBySlugQuery>> = ({
  data,
  location
}) => {
  const { previous, next, mdx, recentArticles, sameTagArticles, hotArticles } =
    data

  const { frontmatter, body, tableOfContents, fields } = mdx || {
    frontmatter: { hero: {} },
    fields: {},
    items: []
  }

  const {
    isModified,
    gitAuthorTime,
    readingTime,
    lowerCaseTags,
    fullPath,
    dirName
  } = fields
  const { title, description, hero, date, slug, verification } = frontmatter
  const { publicURL, childImageSharp } = hero
  const { locale } = useLocalization()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const editOnGitHub = makeRepoPostPath(slug, locale as 'en' | 'ja')

  // useAccessCounter(slug)

  return (
    <MdxProvider>
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
            dirName={dirName}
            tags={lowerCaseTags}
            date={new Date(date).toLocaleDateString(locale)}
            modifiedDate={new Date(gitAuthorTime).toLocaleDateString(locale)}
            isModified={isModified}
            editLink={editOnGitHub}
          >
            <div className="container mx-auto flex-col xl:flex-row flex flex-wrap ">
              <aside className="xl:w-1/5 max-w-prose mx-auto w-full min-w-[250px] mb-6 xl:mb-0 xl:pb-28 order-1">
                <div className="xl:sticky top-24">
                  <GoogleAdsense
                    style={{ display: 'block' }}
                    dataAdFormat="auto"
                    dataAdSlot="4829036417"
                    dataFullWidthResponsive="true"
                  />

                  <ReadingProgress />
                </div>
              </aside>

              <section
                className="mx-auto w-full prose xl:w-3/5 order-2"
                itemProp="articleBody"
              >
                <MDXRenderer>{body}</MDXRenderer>
                <hr className="prose mx-auto my-10" />

                <a
                  className="text-accent space-x-1 underline md:no-underline hover:underline"
                  href={editOnGitHub}
                  target="_blank"
                  rel="noopener"
                >
                  <span>Edit this page on GitHub</span>
                  <Icon icon={icon} className="w-5 h-5" />
                </a>

                <div className="space-x-4 my-4">
                  <SnsShare title={title} url={fullPath} />
                </div>
              </section>

              <div className="xl:w-1/5 max-w-prose mx-auto order-1 mb-6 xl:order-3 w-full lg:block hidden space-y-4">
                <VerificationEnv {...verification} />

                <nav className="sticky top-24">
                  <Toc
                    className="rounded-md  bg-gray-100  dark:bg-blue-gray-800"
                    toc={tableOfContents.items}
                  />
                </nav>
              </div>
            </div>
          </Article>

          <Intersection rootMargin="200px" keepRender>
            <div className="my-8">
              <Subscribe />
            </div>
          </Intersection>

          <div className=" max-w-prose mx-auto my-10">
            <OtherArticles
              previous={previous}
              next={next}
              className="mb-6"
              recentArticles={recentArticles}
              hotArticles={hotArticles}
              sameTagArticles={sameTagArticles}
              tags={lowerCaseTags}
            />
          </div>

          <section className="max-w-prose -mx-4 md:mx-auto">
            <Comment className="md:mb-2" />
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
                    className={`fixed max-h-[90vh] overflow-y-scroll backdrop-filter shadow backdrop-blur bg-gray-50 dark:bg-blue-gray-900 z-[2] rounded-t-3xl dark:border-blue-gray-700 border-t bottom-0 inset-x-0`}
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
    </MdxProvider>
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
    $dateFormat: String!
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
        dirName
      }
      tableOfContents
      frontmatter {
        title
        description
        date(formatString: $dateFormat)
        hero {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        slug
        verification {
          os {
            name
            family
            version
          }
          packages {
            node {
              name
              version
            }
          }
        }
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
          dateByMMM
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
    hotArticles: allMdx(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        fields: { locale: { eq: $locale }, view: { gt: 0 } }
        frontmatter: {
          slug: { nin: [$slug, $previousPostSlug, $nextPostSlug] }
        }
      }
      sort: { fields: fields___view, order: DESC }
      limit: 5
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
        date(formatString: $dateFormat)
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
        date(formatString: $dateFormat)
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
