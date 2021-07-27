import { useLocalization } from 'gatsby-theme-i18n'
import { navigations } from './constants'

const useLocalizedPath = () => {
  const { localizedPath, ...rest } = useLocalization()

  return (path: string) => localizedPath({ ...rest, path }) as string
}

const useLocalizedNavigations = () => {
  const localePath = useLocalizedPath()

  return navigations.map(({ title, to, icon, className }) => ({
    title,
    icon,
    to: localePath(to),
    className
  }))
}

export { useLocalizedPath, useLocalizedNavigations }
