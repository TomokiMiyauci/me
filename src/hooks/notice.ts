import { useState, useRef, useEffect, useContext } from 'react'
import { Notice } from '../types/notice'
import NoticeContext from '../contexts/notice'

const useNoticeProvider = () => {
  const [state, changeState] = useState<Notice>({})
  const [isShow, changeShow] = useState(false)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const notice = (payload: Notice) => {
    changeState(payload)
    changeShow(true)
  }

  useEffect(() => {
    if (!isShow) return
    timeoutId.current = setTimeout(() => {
      changeShow(false)
    }, 6000)
  }, [isShow])

  return [{ ...state, isShow }, notice] as [
    Notice & {
      isShow: boolean
    },
    (payload: Notice) => void
  ]
}

const useNotice = () => useContext(NoticeContext)

export { useNoticeProvider, useNotice }
