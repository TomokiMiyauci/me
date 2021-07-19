import React, { FC } from 'react'
import Me from '../components/Me'
import Seo from '../components/seo'
import { PageProps, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Icon } from '@iconify/react'

import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
const IndexPage: FC<PageProps> = ({ data, location }) => {
  const {
    site: { siteMetadata }
  } = data
  const { siteUrl } = siteMetadata
  const { locale } = useLocalization()
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

        <div className="mt-10 md:mt-30 grid grid-cols-1 gap-6 md:grid-cols-2">
          <LocalizedLink
            to="/posts/"
            language={locale}
            className="rounded-md hover:scale-105 hover:-translate-y-2 hover:opacity-80 transition duration-300 transform block bg-gradient-to-r min-h-[260px] p-6 md:p-10 from-purple-800 to-pink-700 text-2xl shadow relative"
          >
            <Icon
              icon="carbon:blog"
              className="absolute w-full h-full top-0 left-0 fill-current dark:opacity-10 opacity-30"
            />
            <p className="text-gray-200 z-10">
              Technology Information Blog. I write about anything that comes to
              my mind, regardless of the field.
            </p>

            <h2 className="mt-10 text-5xl font-semibold text-white">Blog</h2>
          </LocalizedLink>

          <LocalizedLink
            to="/photos/"
            language={locale}
            className="rounded-md hover:scale-105 hover:-translate-y-2 hover:opacity-80 transition duration-300 transform flex flex-col justify-between min-h-[260px] bg-gradient-to-r p-6 md:p-10 from-cyan-500 to-emerald-700 text-2xl shadow relative"
          >
            <Icon
              icon="mdi:camera-outline"
              className="absolute w-full h-full top-0 left-0 fill-current dark:opacity-10 opacity-20"
            />
            <p className="text-gray-200">My photo gallery</p>
            <h2 className="mt-10 text-5xl font-semibold text-white">Photo</h2>
          </LocalizedLink>
        </div>
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
