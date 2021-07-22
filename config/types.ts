type SiteMetaData = {
  siteUrl: string
  title: string
  description: string
  author: string
  copyright: string
  image: string
  social: {
    twitter: string
    github: string
  }
}

type Locale = 'en' | 'ja'

export type { SiteMetaData, Locale }
