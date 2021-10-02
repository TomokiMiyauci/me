import { createContext } from 'react'
import type { useSwitch } from '@/hooks/state'
import type { useTouches } from '@/hooks/touch'

export default createContext<ReturnType<typeof useSwitch>>([
  false,
  {
    on: () => {},
    off: () => {}
  }
])

const ContextTouches = createContext<ReturnType<typeof useTouches>>({
  touchStart: [undefined, () => {}],
  touchEnd: [undefined, () => {}],
  touchMove: [undefined, () => {}]
})

export { ContextTouches }
