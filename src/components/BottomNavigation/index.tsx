import { memo } from 'react'
import { useLocalizedNavigations } from './hooks'
import Navigation from '@/components/BottomNavigation/Navigation'
import { classNames } from '@/utils/class_name'
import { useLayoutContext } from '@/layouts/hooks'

import type { FC } from 'react'
import type { Locale } from 'config/types'

const BottomNavigation: FC<{
  className?: string
}> = ({ className }) => {
  const { locale, path } = useLayoutContext()
  return (
    <div
      className={classNames(
        'bg-gray-50 dark:bg-blue-gray-900 backdrop-blur-md dark:border-gray-800 fixed bottom-0 inset-x-0 w-full border-t',
        className
      )}
      style={{ '--tw-bg-opacity': '0.7' }}
    >
      <Memo locale={locale} currentPath={path} />
    </div>
  )
}

const Nav: FC<{ currentPath: string; locale: Locale }> = ({
  currentPath,
  locale
}) => {
  const localizedNavs = useLocalizedNavigations(locale)

  return <Navigation navigations={localizedNavs} currentPath={currentPath} />
}

const Memo = memo(Nav)

export default BottomNavigation
