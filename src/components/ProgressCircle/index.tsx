import { FC } from 'react'
import Circle from '@/components/ProgressCircle/ProgressCircle'
import type { CircleProps } from '@/components/ProgressCircle/ProgressCircle'
import { useMemo } from 'react'
import { classNames } from '@/utils/class_name'

const Index: FC<{ isStart: boolean } & CircleProps> = ({
  isStart,
  circleClass,
  ...props
}) => {
  const _circleClass = useMemo<string>(() => {
    return classNames(
      isStart ? 'duration-500' : 'duration-[3000ms]',
      circleClass
    )
  }, [circleClass, isStart])
  return (
    <Circle
      {...props}
      circleClass={_circleClass}
      strokeDashoffset={isStart ? '0' : '360'}
    />
  )
}

export default Index
