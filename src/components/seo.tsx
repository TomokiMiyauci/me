import React, { FC, ReactChild } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SeoProps {
  title: string
  description: string
  children: ReactChild
  fullpath: string
  imgUrl: string
}

const Seo: FC<Partial<SeoProps>> = ({
  description,
  title,
  children,
  fullpath,
  imgUrl
}) => {
  const {
    site: { siteMetadata }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
            copyright
            image
            social {
              twitter
              github
            }
          }
        }
      }
    `
  )

  const {
    title: _title,
    description: _description,
    siteUrl,
    author,
    copyright,
    image,
    social
  } = siteMetadata

  const imageUrl = new URL('logo.png', siteUrl).toString()

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: siteUrl,
    logo: imageUrl
  }

  const metaDescription = description || siteMetadata.description
  const { twitter, github } = social

  return (
    <Helmet title={title} titleTemplate={`%s | ${_title}`}>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      <meta name="description" content={description || _description} />
      <meta name="author" content={author} />
      <meta name="copyright" content={copyright} />
      <meta
        property="og:image"
        content={imgUrl ? new URL(imgUrl, siteUrl).toString() : imageUrl}
      />
      <meta property="og:url" content={fullpath} />
      <meta name="og:title" content={`${title} | ${_title}`} />
      <meta name="og:description" content={description || _description} />
      <meta property="og:site_name" content={_title} />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:title" content={`${title} | ${_title}`} />
      <meta name="twitter:description" content={metaDescription} />
      <script type="application/ld+json">{JSON.stringify(ldJson)}</script>

      {children}
    </Helmet>
  )
}

export default Seo
