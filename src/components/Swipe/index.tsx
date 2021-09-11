import SwipeArea from '@/components/Swipe/SwipeArea'
import SwipeBar from '@/components/Swipe/SwipeBar'

import { useContext } from 'react'
import { useSearchShow } from '@/components/Search/hooks'
import { SwipeContext } from '@/components/Swipe/Context'

import type { FC } from 'react'

const Index: FC = () => {
  const { diff, changeInitState, changeMidState } = useContext(SwipeContext)
  const [_, changeShow] = useSearchShow()

  return (
    <SwipeArea
      onTouchStart={(ev) => changeInitState(ev.touches[0].pageY)}
      onTouchMove={({ touches }) => changeMidState(touches[0].pageY)}
      onTouchEnd={() => {
        if (diff > 30) {
          changeShow(false)
        } else {
          changeInitState(0)
          changeMidState(0)
        }
      }}
    >
      <SwipeBar className="w-24" />
    </SwipeArea>
  )
}

export default Index
