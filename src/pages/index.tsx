import { FC } from 'react'
import { PageProps, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Me from '@/components/Me'
import Seo from '@/components/seo'
import MainMenu from '@/components/MainMenu'

const IndexPage: FC<PageProps> = ({ data, location }) => {
  const {
    site: { siteMetadata }
  } = data
  const { siteUrl } = siteMetadata
  const fullpath = new URL(location.pathname, siteUrl).toString()

  return (
    <>
      <Seo title="Home" fullpath={fullpath} />

      <Helmet>
        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <div className="container max-w-4xl mx-auto md:p-14">
        <Me />

        <section className="mt-10 md:mt-30 grid grid-cols-1 gap-6 md:grid-cols-2">
          <MainMenu />
        </section>
      </div>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query Home {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
