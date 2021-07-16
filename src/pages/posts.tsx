import React, { FC, useContext } from 'react'
import { PageProps, graphql } from 'gatsby'
import { BlogPostsQuery } from '../../graphql-types'
import ArticleHeadline from '../components/ArticleHeadline'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import { Helmet } from 'react-helmet'
import Newsletter from '../components/Newsletter'

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

      <div className="container mx-auto">
        <h1 className="text-center text-5xl my-4 md:my-10">Blog</h1>
        <ul className="mx-auto md:grid md:grid-cols-2 md:gap-14 max-w-5xl">
          {allMdx.nodes.map(
            ({
              frontmatter: { title, thumbnail, description, date, slug, tags },
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
                  tags={tags ?? []}
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
          tags
        }
        fields {
          readingTime {
            text
          }
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
