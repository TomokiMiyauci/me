import { Url } from '../types'

interface BlogPostingParams {
  headline: string
  description: string
  canonicalUrl: Url
  image: Url[]
  datePublished: Date | string
  dateModified: Date | string
  author: string
  publisher: {
    name: string
    logoUrl: Url
  }
}

interface MainEntityOfPage {
  '@type': 'WebPage'
  '@id': Url
}

interface BlogPosting {
  '@type': 'BlogPosting'
  mainEntityOfPage: MainEntityOfPage
  headline: string
  description: string
  image: Url[]
  datePublished: string
  dateModified: string
  author: {
    '@type': 'Person'
    name: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: Url
    }
  }
}

const toISO = (date: Date): string => date.toISOString()
const text2Date = (val: string): Date => new Date(Date.parse(val))

const blogPosting = ({
  canonicalUrl,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher
}: BlogPostingParams): BlogPosting => {
  const { name, logoUrl } = publisher
  return {
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    headline,
    description,
    image,
    datePublished:
      typeof datePublished === 'string'
        ? toISO(text2Date(datePublished))
        : toISO(datePublished),
    dateModified:
      typeof dateModified === 'string'
        ? toISO(text2Date(dateModified))
        : toISO(dateModified),
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl
      }
    }
  }
}

export { blogPosting, BlogPostingParams }
