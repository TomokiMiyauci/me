import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import loadable from '@loadable/component'
import { Static } from 'react-partial-hydration'

const MenuCardBlog = loadable(() => import('@/components/MainMenu/MenuCard'), {
  resolveComponent: ({ MenuCardBlog }) => MenuCardBlog
})

const MenuCardPhoto = loadable(() => import('@/components/MainMenu/MenuCard'), {
  resolveComponent: ({ MenuCardPhoto }) => MenuCardPhoto
})

const MenuCardProject = loadable(
  () => import('@/components/MainMenu/MenuCard'),
  {
    resolveComponent: ({ MenuCardProject }) => MenuCardProject
  }
)

import type { FC } from 'react'

const Index: FC = () => {
  const { locale } = useLocalization()

  return (
    <>
      <LocalizedLink to="/posts/" language={locale}>
        <Static>
          <MenuCardBlog />
        </Static>
      </LocalizedLink>

      <LocalizedLink to="/projects/" language={locale}>
        <Static>
          <MenuCardProject />
        </Static>
      </LocalizedLink>

      <LocalizedLink to="/photos/" language={locale}>
        <Static>
          <MenuCardPhoto />
        </Static>
      </LocalizedLink>
    </>
  )
}

export default Index
