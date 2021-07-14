import { createContext, useState, useRef, useEffect } from 'react'
import { Notice } from './types'

const NoticeContext = createContext<
  [
    Notice & {
      isShow: boolean
    },
    (args: Notice) => void
  ]
>([{ isShow: false }, () => {}])

const useNotice = () => {
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

export default NoticeContext

export { useNotice }
