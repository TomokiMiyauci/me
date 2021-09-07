import { FC, useEffect } from 'react'
import { optimizer } from '@/utils/optimizer'
import ProgressBar from '@/components/ReadingProgress/ProgressBar'
import { useStateIfMounted } from 'use-state-if-mounted'

const useReading = () => {
  const [reading, changeReading] = useStateIfMounted({
    max: 0,
    val: 0
  })
  const fn = optimizer(() => {
    changeReading({
      max: document.body.clientHeight - innerHeight,
      val: scrollY
    })
  })

  useEffect(() => {
    addEventListener('scroll', fn, { passive: true })

    return () => removeEventListener('scroll', fn)
  }, [])

  return reading
}

const ReadingProgress: FC = () => {
  const { max, val } = useReading()

  return (
    <ProgressBar
      className="fixed xl:static xl:w-56 top-0 inset-x-0 z-[1] xl:z-auto xl:mt-[200px] xl:transform xl:rotate-90"
      max={max}
      val={val}
    />
  )
}
export default ReadingProgress
