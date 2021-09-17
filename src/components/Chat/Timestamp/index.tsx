import Timestamp from '@/components/Chat/Timestamp/Timestamp'
import { classNames } from '@/utils/class_name'
import type { FC } from 'react'

const Index: FC<{ className?: string; date: Date }> = ({ className, date }) => {
  return (
    <span className={classNames('text-gray-400 text-xs', className)}>
      <Timestamp date={date} />
    </span>
  )
}

export default Index
