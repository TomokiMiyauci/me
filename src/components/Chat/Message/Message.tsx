import { classNames } from '@/utils/class_name'
import Timestamp from '@/components/Chat/Timestamp'
import { forwardRef } from 'react'

const DEFAULT_NAME = 'Anonymous'

const Message = forwardRef<
  HTMLDivElement,
  {
    className?: string
    name: string | null
    message: string
    date: Date
  }
>(({ className, name = DEFAULT_NAME, message, date }, ref) => {
  return (
    <div ref={ref} className={classNames('space-y-1', className)}>
      <div className="text-xs">{name}</div>
      <div className="space-x-2">
        <div className="rounded-xl max-w-[80vw] inline-block bg-gray-400 break-words whitespace-pre-wrap bg-opacity-20 py-1 px-3">
          {message}
        </div>

        <span className="align-bottom text-gray-400 text-xs">
          <Timestamp date={date} />
        </span>
      </div>
    </div>
  )
})

export default Message
