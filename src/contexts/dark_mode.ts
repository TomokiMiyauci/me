import { createContext } from 'react'
import type { DarkMode } from 'use-dark-mode'

export default createContext<DarkMode>({
  value: false,
  toggle: () => {},
  enable: () => {},
  disable: () => {}
})
