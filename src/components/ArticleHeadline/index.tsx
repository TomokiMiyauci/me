import React, { FC } from 'react'
import ArticleHeadline from '@/components/ArticleHeadline/ArticleHeadline'
import { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import { GatsbyImage } from 'gatsby-plugin-image'

const Index: FC<ArticleHeadlineProps> = ({ to, alt, img, ...rest }) => {
  const { locale } = useLocalization()

  return (
    <LocalizedLink to={to} language={locale}>
      <ArticleHeadline
        {...rest}
        Img={
          <GatsbyImage
            className="m-2 sm:m-3 rounded overflow-visible"
            alt={alt}
            image={img}
          />
        }
      />
    </LocalizedLink>
  )
}

export default Index
