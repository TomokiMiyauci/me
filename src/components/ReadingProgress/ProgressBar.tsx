import React, { FC } from 'react'

const ProgressBar: FC<{ max: number; val: number }> = ({ max, val }) => (
  <progress
    max={max}
    value={val}
    className="appearance-none w-full fixed top-0 z-[1] lg:z-auto lg:w-56 inset-x-0 lg:inset-x-auto lg:sticky h-1 lg:bg-gray-200 lg:dark:bg-blue-gray-800 lg:top-1/2 lg:transform lg:rotate-90"
  />
)

export default ProgressBar
