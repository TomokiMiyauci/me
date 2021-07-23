import { GatsbyConfig } from 'gatsby'
import { SITE_URL as siteUrl, SITE_NAME as name } from './constants'
// import { queries } from '../src/utils/algolia_queries'
import { config as _config } from 'dotenv'
import { SiteMetaData } from './types'
import plugins from './gatsby-plugins'
_config()

const _siteMetaData: SiteMetaData = {
  siteUrl,
  title: name,
  description:
    "This is Tomoki Miyauchi's personal site. You can check the activity record of me such as technical blog and list of projects.",
  author: "Tomoki Miyauchi'",
  copyright: `${new Date().getFullYear()} ©Tomoki Miyauchi`,
  image: 'https://miyauchi.dev/logo.svg',
  social: {
    twitter: '@tomoki_miyauci',
    github: 'TomokiMiyauci'
  }
}

const siteMetadata: GatsbyConfig['siteMetadata'] = _siteMetaData

const config: GatsbyConfig = {
  siteMetadata,
  plugins
}

export default config
