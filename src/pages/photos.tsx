import React, { FC } from 'react'
import { PageProps, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Seo from '../components/seo'

const Photos: FC<PageProps> = ({
  data,
  pageContext: { originalPath },
  location
}) => {
  const {
    site: { siteMetadata }
  } = data
  const { siteUrl } = siteMetadata
  const fullpath = new URL(location.pathname, siteUrl).toString()

  return (
    <Layout originalPath={originalPath}>
      <Seo title="Photo" fullpath={fullpath} />
      <div className="grid gap-1 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.allFile.nodes.map(({ childImageSharp }) => {
          return (
            <div className="overflow-hidden">
              <GatsbyImage
                key={childImageSharp.id}
                alt="photo"
                className="transform hover:scale-110 duration-500 filter hover:saturate-130 transition-all"
                image={childImageSharp.gatsbyImageData}
              />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Photos {
    allFile(filter: { sourceInstanceName: { eq: "photos" } }) {
      nodes {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 1)
          id
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

export default Photos
