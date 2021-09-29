import { createContext } from 'react'

export default createContext<[boolean, (val: boolean) => void]>([
  false,
  (_: boolean) => {}
])
