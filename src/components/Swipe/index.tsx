import SwipeArea from '@/components/Swipe/SwipeArea'
import SwipeBar from '@/components/Swipe/SwipeBar'

import SearchContext from '@/components/Search/context'
import { SwipeContext } from '@/components/Swipe/Context'
import { useContext } from 'react'
import type { FC } from 'react'

const Index: FC = () => {
  const { diff, changeInitState, changeMidState, changeTouch } =
    useContext(SwipeContext)
  const [_, { off: hideDialog }] = useContext(SearchContext)

  return (
    <SwipeArea
      onTouchStart={({ touches }) => changeInitState(touches[0].pageY)}
      onTouchMove={({ touches }) => {
        changeTouch(touches[0])
        changeMidState(touches[0].pageY)
      }}
      onTouchEnd={() => {
        if (diff > 30) {
          hideDialog()
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
