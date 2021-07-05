import React, { FC, useState, useEffect, memo } from 'react'
import { scrollInfoEvent } from '../../utils/scroll'
import BottomNavigation from '../BottomNavigation'
import TheHeader from '../TheHeader'
import TheFooter from '../TheFooter'

const MemoedTheHeader = memo(TheHeader)
const MemoedTheFooter = memo(TheFooter)
const MemoedBottomNavigation = memo(BottomNavigation)

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

const AppFrame: FC<{ originalPath: string; currentPath: string }> = ({
  originalPath,
  currentPath
}) => {
  const isShowHeader = useScrollShower(true)

  return (
    <>
      <MemoedTheHeader
        originalPath={originalPath}
        currentPath={currentPath}
        className={`transform md:transform-none md:translate-y-0 transition-transform duration-300 delay-500 ${
          isShowHeader ? '' : '-translate-y-full'
        }`}
      />

      <MemoedTheFooter />

      <MemoedBottomNavigation
        currentPath={currentPath}
        className={`transform md:hidden md:transform-none md:translate-y-0 transition-transform duration-300 delay-100 ${
          isShowHeader ? '' : 'translate-y-full'
        }`}
      />
    </>
  )
}

export default AppFrame
