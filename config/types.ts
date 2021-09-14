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

type PageContext = {
  previousPostSlug: string
  nextPostSlug: string
  slug: string
  locale: Locale
  hrefLang: 'en-US' | 'jp-JA'
  originalPath: string
  dateFormat: string
}

export type { SiteMetaData, Locale, PageContext }
