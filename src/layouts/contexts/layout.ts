import { createContext } from 'react'
import type { LayoutContext as LayoutContextType } from '@/layouts/types'

const LayoutContext = createContext<Readonly<LayoutContextType>>({
  locale: 'en',
  originalPath: '/',
  path: '/'
})

export default LayoutContext
