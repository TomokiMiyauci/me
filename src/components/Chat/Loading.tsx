import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import type { FC } from 'react'

const Loading: FC = () => {
  return (
    <div className="text-center space-y-4">
      <ProgressCircle />

      <div>Loading...</div>
    </div>
  )
}

export default Loading
