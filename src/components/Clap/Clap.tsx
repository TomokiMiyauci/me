import React, { FC, ButtonHTMLAttributes } from 'react'
import heartOutline from '@iconify-icons/mdi/heart-outline'
import heart from '@iconify-icons/mdi/heart'
import { Icon } from '@iconify/react'

type EventHandler<T = undefined> = {
  on: T extends undefined ? () => Promise<any> : (val: T) => Promise<boolean>
  success: () => Promise<void> | void
  error: () => Promise<void> | void
}
const Clap: FC<
  {
    clap: number
    fill?: boolean
  } & EventHandler &
    ButtonHTMLAttributes<HTMLButtonElement>
> = ({ on, success, error, clap, fill, ...props }) => {
  const handleClick = async () => on().then(success).catch(error)

  return (
    <button {...props} className="space-x-1 group" onClick={handleClick}>
      <Icon
        icon={fill ? heart : heartOutline}
        className={`w-9 h-9 md:w-10 md:h-10 rounded-full p-1 group-hover:text-accent group-hover:bg-gray-200 dark:group-hover:bg-gray-700 group-hover:bg-opacity-50 transition duration-300 ${
          fill ? 'text-accent' : 'text-gray-500'
        }`}
      />
      <span>{clap}</span>
    </button>
  )
}

export default Clap
