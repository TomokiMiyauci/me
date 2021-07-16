import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import { Transition } from '@headlessui/react'
import { Notice } from '@/types/notice'

const Snackbar: FC<
  {
    className?: string
    isShow?: boolean
  } & Notice
> = ({ className, field, iconClass, icon, isShow }) => {
  return (
    <Transition
      show={isShow}
      enter="transform transition duration-300"
      enterFrom="opacity-0 -translate-x-full"
      enterTo="opacity-100 ease-out"
      leave="transform duration-300 transition ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 -translate-x-full"
    >
      <span
        className={`inline-flex bg-gray-100 dark:bg-blue-gray-800 space-x-2 md:rounded-md px-2 py-3 border border-accent ${className}`}
      >
        {icon && <Icon icon={icon} className={`w-8 h-8 ${iconClass}`} />}
        {field}
      </span>
    </Transition>
  )
}

export default Snackbar
