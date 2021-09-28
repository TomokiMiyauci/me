import TheHeader from '@/components/TheHeader/TheHeader'
import { useLayoutContext } from '@/layouts/hooks'
import type { FC } from 'react'

const Index: FC = () => {
  const { originalPath, path, locale } = useLayoutContext()
  return (
    <TheHeader
      originalPath={originalPath}
      currentPath={path}
      locale={locale}
      className="hidden md:block"
    />
  )
}

export default Index
