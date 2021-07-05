import React, { FC, useState, useEffect } from 'react'
// import { optimizer } from '../../utils/optimizer'
import ProgressBar from './ProgressBar'

const useReading = () => {
  const [reading, changeReading] = useState({
    max: 0,
    val: 0
  })
  useEffect(() => {
    // const fn = optimizer(() => {
    //   changeReading({
    //     max: document.body.clientHeight - innerHeight,
    //     val: scrollY
    //   })
    // })

    const fn = () => {
      changeReading({
        max: document.body.clientHeight - innerHeight,
        val: scrollY
      })
    }

    addEventListener('scroll', fn)

    return () => removeEventListener('scroll', fn)
  }, [reading])

  return reading
}

const ReadingProgress: FC = () => {
  const { max, val } = useReading()

  return <ProgressBar max={max} val={val} />
}
export default ReadingProgress
