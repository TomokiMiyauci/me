import { createContext } from 'react'
import type { VFn } from 'react-hookable'

export default createContext<[boolean, { on: VFn; off: VFn }]>([
  false,
  {
    on: () => {},
    off: () => {}
  }
])
