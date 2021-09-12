import SwipeArea from '@/components/Swipe/SwipeArea'
import SwipeBar from '@/components/Swipe/SwipeBar'

import { useContext } from 'react'
import { useSearchShow } from '@/components/Search/hooks'
import { SwipeContext } from '@/components/Swipe/Context'
import type { FC } from 'react'

const Index: FC = () => {
  const { diff, changeInitState, changeMidState, changeTouch } =
    useContext(SwipeContext)
  const [_, changeShow] = useSearchShow()

  return (
    <SwipeArea
      onTouchStart={({ touches }) => changeInitState(touches[0].pageY)}
      onTouchMove={({ touches }) => {
        changeTouch(touches[0])
        changeMidState(touches[0].pageY)
      }}
      onTouchEnd={() => {
        if (diff > 30) {
          changeShow(false)
        } else {
          changeInitState(0)
          changeMidState(0)
        }
      }}
      className="group md:hidden"
    >
      <SwipeBar className="w-24 transition-transform duration-500 animate-pulse-bit-slow group-active:translate-y-1" />
    </SwipeArea>
  )
}

export default Index
