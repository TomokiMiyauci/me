import { FC } from 'react'

const ProgressBar: FC<{ max: number; val: number; className?: string }> = ({
  max,
  val,
  className
}) => (
  <progress
    max={max}
    value={val}
    className={`appearance-none w-full h-1 lg:bg-gray-200 lg:dark:bg-blue-gray-800 ${className}`}
  />
)

export default ProgressBar
