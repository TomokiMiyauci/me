import type { FC } from 'react'
import Timestamp from '@/components/Chat/Timestamp'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import type { IconifyIcon } from '@iconify/react'

type RoomProps = {
  title: string
  message: string
  date: Date
  unreadMessages: number
  icon: () => Promise<{
    default: IconifyIcon
  }>
}

const Room: FC<Partial<RoomProps>> = ({
  title,
  date,
  message,
  unreadMessages,
  icon
}) => {
  return (
    <>
      <div className="flex-none">
        {icon && (
          <IconSkeltonLoader
            className="w-12 h-12 bg-gray-400 bg-opacity-20 p-1 rounded-md text-accent"
            icon={icon}
          />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="flex leading-tight items-center justify-between">
          <span className="font-semibold flex-1">{title}</span>
          {date && <Timestamp date={date} />}
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-400 font-light leading-none text-sm flex-1 line-clamp-2 max-w-[70vw] break-words whitespace-pre-wrap">
            {message}
          </span>

          {!!unreadMessages && (
            <span className="rounded-full bg-green-500 font-bold px-2">
              {unreadMessages}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default Room
export type { RoomProps }
