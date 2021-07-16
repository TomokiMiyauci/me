import { createContext } from 'react'
import { Notice } from '../types/notice'

const NoticeContext = createContext<
  [
    Notice & {
      isShow: boolean
    },
    (args: Notice) => void
  ]
>([{ isShow: false }, () => {}])

export default NoticeContext
