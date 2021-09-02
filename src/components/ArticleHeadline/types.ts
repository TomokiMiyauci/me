import { IGatsbyImageData } from 'gatsby-plugin-image'
import type { ReactElement } from 'react'

type ArticleHeadlineProps = {
  title: string
  description: string
  img: IGatsbyImageData
  to: string
  alt: string
  tags: (string | { name: string; className: string })[]
  lastUpdated?: string
  readingTime?: string
  Area?: ReactElement
}

type Order = 'recent' | 'hot' | 'like'

export type { ArticleHeadlineProps, Order }
