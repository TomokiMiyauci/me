import { useState, useRef, useEffect, useContext, ReactElement } from 'react'
import NoticeContext from '@/contexts/notice'
import type { Notice, NoticeType } from '@/types/notice'

const useNoticeProvider = () => {
  const [state, changeState] = useState<Notice>({
    type: 'success',
    field: undefined
  })
  const [isShow, changeShow] = useState(false)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const notice = (payload: NoticeType & { field: ReactElement }) => {
    changeState(payload)
    changeShow(true)
  }

  const clear = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
  }

  const close = (): void => {
    clear()
    changeShow(false)
  }

  useEffect(() => {
    if (!isShow) return
    clear()
    timeoutId.current = setTimeout(() => {
      changeShow(false)
    }, 6000)

    return clear
  }, [isShow, state.field])

  return [
    { ...state, isShow },
    { notice, close }
  ] as [
    Notice & {
      isShow: boolean
    },
    { notice: (args: Notice) => void; close: () => void }
  ]
}

const useNotice = () => {
  const [_, { notice }] = useContext(NoticeContext)

  return notice
}

export { useNoticeProvider, useNotice }
