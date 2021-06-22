import React, { FC, useState, useCallback } from 'react'
import { PageProps, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Carousel, { Modal, ModalGateway } from 'react-images'
const Photos: FC<PageProps> = ({
  data,
  pageContext: { originalPath },
  location
}) => {
  const {
    site: { siteMetadata }
  } = data
  const { siteUrl } = siteMetadata
  const [isShow, changeShow] = useState(false)
  const fullpath = new URL(location.pathname, siteUrl).toString()
  const [imageIndex, changeImage] = useState(0)
  const change = (index: number, isShow: boolean) => {
    changeImage(index)
    changeShow(isShow)
  }

  return (
    <Layout originalPath={originalPath}>
      <Seo title="Photo" fullpath={fullpath} />

      <h1 className="text-5xl md:text-center mb-4 md:mb-10">Photo</h1>

      <div className="grid gap-1 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 -mx-3 md:mx-0">
        {data.allFile.nodes.map(({ childImageSharp }, i) => {
          return (
            <div
              key={childImageSharp.id}
              onClick={() => change(i, true)}
              className="overflow-hidden cursor-pointer"
            >
              <GatsbyImage
                alt="photo"
                className="transform hover:scale-110 duration-500 filter hover:saturate-[1.3] transition-all"
                image={childImageSharp.gatsbyImageData}
              />
            </div>
          )
        })}
      </div>
      <ModalGateway>
        {isShow ? (
          <Modal onClose={() => changeShow(false)}>
            <Carousel
              currentindexex={imageIndex}
              views={data.allFile.nodes.map(({ childImageSharp }) => ({
                source: childImageSharp.gatsbyImageData.images.fallback.src
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
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
