import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader'
import BottomNavigation from '@/components/BottomNavigation'
import { classNames } from '@/utils/class_name'
import { useScrollShower } from '@/components/AppFrame/hooks'
import { useEffect } from 'react'
import { useResize } from '@/hooks/resize'
import { MOBILE_BREAK_POINT } from '@/../config/constants'

import type { FC } from 'react'
import type { Locale } from 'config/types'

const AppFrame: FC<{
  originalPath: string
  currentPath: string
  locale: Locale
}> = ({ originalPath, currentPath, locale }) => {
  const { isShow: isShowHeader, register, unregister } = useScrollShower(true)
  const { onResize } = useResize()

  useEffect(() => {
    onResize(() => {
      if (window.innerWidth < MOBILE_BREAK_POINT) {
        register()
      } else {
        unregister()
      }
    })
  }, [])

  useEffect(() => {
    if (window.innerWidth > MOBILE_BREAK_POINT) {
      unregister()
    }
  }, [])

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
