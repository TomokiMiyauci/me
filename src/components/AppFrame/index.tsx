import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader'
import BottomNavigation from '@/components/BottomNavigation'
import { useState, useEffect } from 'react'
import { scrollInfoEvent } from '@/utils/scroll'
import { classNames } from '@/utils/class_name'

import type { FC } from 'react'
import type { Locale } from 'config/types'

const useScrollShower = (init?: boolean) => {
  const [isShow, changeShow] = useState(init ?? false)
  const fn = scrollInfoEvent(({ direction, diff }) => {
    if (diff > 20 && direction === 'up') {
      changeShow(true)
    } else if (diff > 20 && direction === 'down') {
      changeShow(false)
    }
  })

  useEffect(() => {
    addEventListener('scroll', fn)

    return () => removeEventListener('scroll', fn)
  }, [])

  return isShow
}

const AppFrame: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ originalPath, currentPath, locale }) => {
  const isShowHeader = useScrollShower(true)

  return (
    <>
      <TheHeader
        originalPath={originalPath}
        currentPath={currentPath}
        locale={locale}
        className={classNames(
          'transform md:transform-none md:translate-y-0 transition-transform duration-300 delay-500',
          isShowHeader ? undefined : '-translate-y-full'
        )}
      />

      <TheFooter locale={locale} />

      <BottomNavigation
        currentPath={currentPath}
        locale={locale}
        className={classNames(
          'transform md:hidden md:transform-none md:translate-y-0 transition-transform duration-300 delay-100',
          isShowHeader ? undefined : 'translate-y-full'
        )}
      />
    </>
  )
}

export default AppFrame
