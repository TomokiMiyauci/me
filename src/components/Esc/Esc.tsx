import { classNames } from '@/utils/class_name'
import type { FC } from 'react'

const Esc: FC<JSX.IntrinsicElements['button']> = ({ className, ...props }) => {
  return (
    <button
      className={classNames(
        'border dark:border-blue-gray-700 hover:shadow transition-shadow duration-300 rounded-md bg-gray-100 dark:bg-blue-gray-900 text-gray-400 px-1',
        className
      )}
      {...props}
    >
      esc
    </button>
  )
}

export default Esc
