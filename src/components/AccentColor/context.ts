import { createContext } from 'react'
import { useBoolean } from 'react-hookable'
import type { useTouches } from '@/hooks/touch'

export default createContext<ReturnType<typeof useBoolean>>([
  false,
  {
    on: () => {},
    off: () => {},
    toggle: () => {}
  }
])

const ContextTouches = createContext<ReturnType<typeof useTouches>>({
  touchStart: [undefined, () => {}],
  touchEnd: [undefined, () => {}],
  touchMove: [undefined, () => {}]
})

export { ContextTouches }
