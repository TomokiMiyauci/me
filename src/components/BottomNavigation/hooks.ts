import { useLocalization } from 'gatsby-theme-i18n'
import { navigations } from './constants'
import type { Locale } from '@/../config/types'

const useLocalizedPath = (locale: Locale) => {
  const { localizedPath, ...rest } = useLocalization()

  return (path: string) => localizedPath({ ...rest, locale, path }) as string
}

const useLocalizedNavigations = (locale: Locale) => {
  const localePath = useLocalizedPath(locale)

  return navigations.map(({ title, to, icon }) => ({
    title,
    icon,
    to: localePath(to)
  }))
}

export { useLocalizedPath, useLocalizedNavigations }
