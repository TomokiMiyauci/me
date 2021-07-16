import { useEffect, useState } from 'react'
import { getCommentNumber } from '@/utils/github_api'

const useCommentCount = () => {
  const [commentNumber, changeCommentNumber] = useState(0)
  const [loading, changeLoading] = useState(true)

  useEffect(() => {
    getCommentNumber(location.pathname).then((_commentNumber) => {
      changeCommentNumber(_commentNumber)
      changeLoading(false)
    })
  }, [])

  return [commentNumber, loading] as const
}

export { useCommentCount }
