import { createContext } from 'react'
import type { useTouches } from '@/hooks/touch'
import type { VFn } from 'react-hookable'
export default createContext<[boolean, { on: VFn; off: VFn }]>([
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
