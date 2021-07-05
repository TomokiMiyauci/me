import React, { FC, useState, useEffect } from 'react'
import { optimizer } from '../../utils/optimizer'

const useReading = () => {
  const [reading, changeReading] = useState({
    max: 0,
    val: 0
  })
  useEffect(() => {
    const fn = optimizer((ev) => {
      changeReading({
        max: document.body.clientHeight - innerHeight,
        val: scrollY
      })
    })

    addEventListener('scroll', fn)

    return () => removeEventListener('scroll', fn)
  }, [reading])

  return reading
}

const ReadingProgress: FC = () => {
  const { max, val } = useReading()

  return (
    <progress
      max={max}
      value={val}
      className="appearance-none fixed top-0 z-[1] lg:z-auto w-full lg:w-56 inset-x-0 lg:inset-x-auto lg:sticky h-1 lg:bg-gray-200 lg:dark:bg-blue-gray-800 lg:top-1/2 lg:transform lg:rotate-90"
    />
  )
}
export default ReadingProgress
