import React, { FC, useState, useEffect } from 'react'
import { optimizer } from '@/utils/optimizer'
import ProgressBar from '@/components/ReadingProgress/ProgressBar'

const useReading = () => {
  const [reading, changeReading] = useState({
    max: 0,
    val: 0
  })
  useEffect(() => {
    let isMounted = true
    const fn = optimizer(() => {
      if (isMounted) {
        changeReading({
          max: document.body.clientHeight - innerHeight,
          val: scrollY
        })
      }
    })

    addEventListener('scroll', fn, { passive: true })

    return () => {
      isMounted = false
      removeEventListener('scroll', fn)
    }
  }, [reading])

  return reading
}

const ReadingProgress: FC = () => {
  const { max, val } = useReading()

  return <ProgressBar max={max} val={val} />
}
export default ReadingProgress
