import { createContext } from 'react'
import type { Notice } from '@/types/notice'

const NoticeContext = createContext<
  [
    Notice & {
      isShow: boolean
    },
    { notice: (args: Notice) => void; close: () => void }
  ]
>([
  { isShow: false, type: 'success' },
  { notice: () => {}, close: () => {} }
])

export default NoticeContext
