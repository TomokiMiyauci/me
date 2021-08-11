import { IGatsbyImageData } from 'gatsby-plugin-image'

type ArticleHeadlineProps = {
  title: string
  description: string
  img: IGatsbyImageData
  to: string
  alt: string
  tags: (string | { name: string; className: string })[]
  MMM?: string
  no?: number
  lastUpdated?: string
  readingTime?: string
}

export type { ArticleHeadlineProps }
