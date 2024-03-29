import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Seo from '@/components/seo'
import MainMenu from '@/components/MainMenu'
import loadable from '@loadable/component'
import Me from '@/components/Me'

import type { PageProps } from 'gatsby'
import type { FC } from 'react'

const ReactTooltip = loadable(() => import('react-tooltip'), {
  ssr: false
})
const GitHubCalendar = loadable(() => import('react-github-calendar'), {
  ssr: false
})
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

        <GitHubCalendar username="tomokimiyauci">
          <ReactTooltip delayShow={50} html textColor="var(--accent-color)" />
        </GitHubCalendar>

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
