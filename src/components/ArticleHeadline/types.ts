import { IGatsbyImageData } from 'gatsby-plugin-image'

type ArticleHeadlineProps = {
  title: string
  description: string
  img: IGatsbyImageData
  to: string
  alt: string
  tags: string[]
  lastUpdated?: string
  readingTime?: string
}

export type { ArticleHeadlineProps }
