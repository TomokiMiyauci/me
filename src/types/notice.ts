import type { ReactElement } from 'react'
import type { Exclusive } from 'utilitypes'

type Notice = Exclusive<NoticeType, CustomeProps> & {
  field?: ReactElement
  closeable?: boolean
  closeClassName?: string
  url?: string
}

type NoticeType = {
  type: 'success' | 'info' | 'warn' | 'alert'
}

type CustomeProps = {
  icon: ReactElement
  className: string
}

export type { Notice, NoticeType }
