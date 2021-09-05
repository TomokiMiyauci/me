import { ReactElement } from 'react'

type Notice = NoticeType & {
  field?: ReactElement
  closeable?: boolean
}

type NoticeType = {
  type: 'success' | 'info' | 'warn' | 'alert'
}

export type { Notice, NoticeType }
