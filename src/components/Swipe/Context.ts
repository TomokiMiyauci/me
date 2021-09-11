import { createContext } from 'react'
import type { useSwipe } from '@/components/Swipe/hooks'

const SwipeContext = createContext<ReturnType<typeof useSwipe>>({
  diff: 0,
  translate: {},
  touch: undefined,
  changeTouch: () => {},
  changeMidState: () => {},
  changeInitState: () => {},
  reset: () => {}
})

export { SwipeContext }
