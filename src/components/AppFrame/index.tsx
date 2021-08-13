import React, { FC, useState, useEffect } from 'react'
import { scrollInfoEvent } from '@/utils/scroll'
import type { Locale } from '@/../config/types'

import loadable from '@loadable/component'
const TheFooter = loadable(() => import('@/components/TheFooter'))
const TheHeader = loadable(() => import('@/components/TheHeader'))
const BottomNavigation = loadable(() => import('@/components/BottomNavigation'))

const useScrollShower = (init?: boolean) => {
  const [isShow, changeShow] = useState(init ?? false)
  const fn = scrollInfoEvent(({ direction, diff }) => {
    if (diff > 14 && direction === 'up') {
      changeShow(true)
    } else if (diff > 14 && direction === 'down') {
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
        className={`transform md:transform-none md:translate-y-0 transition-transform duration-300 delay-500 ${
          isShowHeader ? '' : '-translate-y-full'
        }`}
      />

      <TheFooter locale={locale} />

      <BottomNavigation
        currentPath={currentPath}
        locale={locale}
        className={`transform md:hidden md:transform-none md:translate-y-0 transition-transform duration-300 delay-100 ${
          isShowHeader ? '' : 'translate-y-full'
        }`}
      />
    </>
  )
}

export default AppFrame
