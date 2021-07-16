import { useLocalization } from 'gatsby-theme-i18n'
import { navigations } from '@/components/BottomNavigation/constants'

const useLocalizedPath = () => {
  const { localizedPath, ...rest } = useLocalization()

  return (path: string) => localizedPath({ ...rest, path }) as string
}

const useLocalizedNavigations = () => {
  const localePath = useLocalizedPath()

  return navigations.map(({ title, to, icon }) => ({
    title,
    icon,
    to: localePath(to)
  }))
}

export { useLocalizedPath, useLocalizedNavigations }
