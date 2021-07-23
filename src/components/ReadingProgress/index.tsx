import React, { FC, useEffect } from 'react'
import { optimizer } from '@/utils/optimizer'
import ProgressBar from '@/components/ReadingProgress/ProgressBar'
import { useStateIfMounted } from 'use-state-if-mounted'

const useReading = () => {
  const [reading, changeReading] = useStateIfMounted({
    max: 0,
    val: 0
  })
  useEffect(() => {
    const fn = optimizer(() => {
      changeReading({
        max: document.body.clientHeight - innerHeight,
        val: scrollY
      })
    })

    addEventListener('scroll', fn, { once: true, passive: true })
  }, [reading])

  return reading
}

const ReadingProgress: FC = () => {
  const { max, val } = useReading()

  return <ProgressBar max={max} val={val} />
}
export default ReadingProgress
