import NoticeContext from '@/contexts/notice'
import { useContext } from 'react'
import { Transition } from '@headlessui/react'
import loadable from '@loadable/component'
import { classNames } from '@/utils/class_name'
const Snackbar = loadable(() => import('@/components/Notice/Snackbar'))

import type { FC } from 'react'

const Index: FC = () => {
  const [props, { close }] = useContext(NoticeContext)

  return (
    <Transition
      show={props.isShow}
      enter="transition-opacity duration-[1500ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-1000 transition-opacity ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Snackbar
        className={classNames(
          'fixed bottom-0 w-full z-50 md:bottom-auto md:right-6 md:top-20 md:max-w-sm',
          props.className
        )}
        type={props.type}
        icon={props.icon}
        onClose={close}
        closeable={props.closeable}
      >
        {props.field ?? <></>}
      </Snackbar>
    </Transition>
  )
}

export default Index
