import { blogPosting, BlogPostingParams } from './article'
import { breadcrumb, ParamsBreadcrumb } from './breadcrumb'
import { logo, LogoParams } from './logo'

interface Params {
  breadcrumb?: ParamsBreadcrumb[]
  logo?: LogoParams
  blogPosting?: BlogPostingParams
}

type Key = keyof Params

const jsonLdResolver = (key: Key) => {
  switch (key) {
    case 'breadcrumb': {
      return breadcrumb
    }

    case 'logo': {
      return logo
    }

    case 'blogPosting': {
      return blogPosting
    }
  }
}

const flatten = (items: any[]) => {
  switch (items.length) {
    case 0: {
      return []
    }
    case 1: {
      return items[0]
    }
    default: {
      return items
    }
  }
}

const jsonld = (params: Params) => {
  const jsonlds = (Object.entries(params) as [Key, any][]).map(
    ([key, value]) => ({
      '@context': 'https://schema.org',
      ...jsonLdResolver(key)(value)
    })
  )

  return flatten(jsonlds)
}

export { breadcrumb, jsonld }
