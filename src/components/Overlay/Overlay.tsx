import { Transition } from '@headlessui/react'
import { classNames } from '@/utils/class_name'
import type { FC, ReactNode } from 'react'

const Overlay: FC<
  Parameters<typeof Transition>[number] & {
    children: ReactNode
  }
> = ({ className, ...props }) => {
  return (
    <Transition
      enter="transition duration-700"
      enterFrom="backdrop-opacity-0"
      leave="transition duration-700"
      leaveTo="backdrop-opacity-0"
      className={classNames('backdrop-blur-md inset-0 fixed', className)}
      {...props}
    />
  )
}

export default Overlay
