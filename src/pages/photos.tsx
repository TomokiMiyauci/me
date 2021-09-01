import { FC, useState } from 'react'
import { PageProps, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import Carousel from 'react-gallery-carousel'
import 'react-gallery-carousel/dist/index.css'
import closeIcon from '@iconify-icons/mdi/close'
import chevronLeft from '@iconify-icons/mdi/chevron-left'
import chevronRight from '@iconify-icons/mdi/chevron-right'
import { Icon } from '@iconify/react/dist/offline'

const Photos: FC<PageProps> = ({ data, location }) => {
  const {
    site: { siteMetadata }
  } = data
  const { siteUrl } = siteMetadata
  const [isShow, changeShow] = useState(false)
  const fullpath = new URL(location.pathname, siteUrl).toString()

  const [currentIndex, changeIndex] = useState(0)

  const handleShowCarousel = (index: number): void => {
    changeIndex(index)
    changeShow(true)
  }

  const images = data.allFile.nodes.map(({ childImageSharp }) => {
    const source = childImageSharp.gatsbyImageData.images.sources[0]

    return {
      src: childImageSharp.gatsbyImageData.images.fallback.src,
      srcset: source?.srcSet,
      sizes: source?.sizes
    }
  })

  return (
    <>
      <Seo title="Photo" fullpath={fullpath} />
      {isShow && (
        <div className={`inset-0 fixed z-[1] text-gray-800`}>
          <div className="relative h-full">
            <button
              onClick={() => changeShow(false)}
              className="z-[1] rounded-full bg-gray-200 hover:bg-opacity-75 transition duration-300 bg-opacity-40 p-1 absolute right-4 top-4"
            >
              <Icon className="w-8 h-8" icon={closeIcon} />
            </button>
            <Carousel
              hasMediaButton={false}
              hasIndexBoard={false}
              index={currentIndex}
              hasSizeButton={false}
              leftIcon={
                <Icon
                  className="hidden md:inline ml-2 w-16 h-16 bg-gray-200 bg-opacity-75 rounded-full"
                  icon={chevronLeft}
                />
              }
              rightIcon={
                <Icon
                  className="hidden md:inline mr-2 w-16 h-16 bg-gray-200 bg-opacity-75 rounded-full"
                  icon={chevronRight}
                />
              }
              images={images}
              className="overflow-hidden"
            ></Carousel>
          </div>
        </div>
      )}

      <h1 className="text-5xl md:text-center mb-4 md:mb-10">Photo</h1>

      <div className="grid gap-1 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 -mx-3 md:mx-0">
        {data.allFile.nodes.map(({ childImageSharp }, i) => {
          return (
            <div
              key={childImageSharp.id}
              onClick={() => handleShowCarousel(i)}
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
    </>
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
