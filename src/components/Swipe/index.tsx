import SwipeArea from '@/components/Swipe/SwipeArea'
import SwipeBar from '@/components/Swipe/SwipeBar'

import { useContext } from 'react'
import { optimizer } from '@/utils/optimizer'
import { ContextTouches } from '@/components/AccentColor/context'

import type { FC } from 'react'

const Index: FC = () => {
  const { touchEnd, touchMove, touchStart } = useContext(ContextTouches)

  const setter =
    (fn: any) =>
    ({ changedTouches }: TouchEvent) =>
      optimizer(fn(changedTouches[0]))
  return (
    <SwipeArea
      onTouchStart={setter(touchStart[1])}
      onTouchMove={setter(touchMove[1])}
      onTouchEnd={setter(touchEnd[1])}
      className="group md:hidden"
    >
      <SwipeBar className="w-24 transition-transform duration-500 animate-pulse-bit-slow group-active:translate-y-1" />
    </SwipeArea>
  )
}

export default Index
