import { ReactElement } from 'react'

type Notice = NoticeType & {
  field?: ReactElement
}

type NoticeType = {
  type: 'success' | 'alert'
}

export type { Notice, NoticeType }
