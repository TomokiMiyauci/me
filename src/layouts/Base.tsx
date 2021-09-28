import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader/TheHeader'
import BottomNavigation from '@/components/BottomNavigation'
import { classNames } from '@/utils/class_name'
import { useScrollShower } from '@/layouts/hooks'
import { useEffect } from 'react'
import { useResize } from '@/hooks/resize'
import { MOBILE_BREAK_POINT } from '@/../config/constants'
import { useLayoutContext } from '@/layouts/hooks'

import type { FC } from 'react'

const Layout: FC = ({ children }) => {
  const { isShow: isShowHeader, register, unregister } = useScrollShower(true)
  const { onResize } = useResize()
  const { originalPath, path, locale } = useLayoutContext()

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
      <main className="p-4 min-h-[90vh] mt-[56px] md:mt-[84px]">
        {children}
      </main>

      <TheHeader
        originalPath={originalPath}
        currentPath={path}
        locale={locale}
        className={classNames(
          'transform md:transform-none md:translate-y-0 transition-transform duration-300 delay-500',
          isShowHeader ? undefined : '-translate-y-full'
        )}
      />

      <TheFooter locale={locale} />

      <BottomNavigation
        className={classNames(
          'transform md:hidden md:transform-none md:translate-y-0 transition-transform duration-300 delay-100',
          isShowHeader ? undefined : 'translate-y-full'
        )}
      />
    </>
  )
}

export default Layout
