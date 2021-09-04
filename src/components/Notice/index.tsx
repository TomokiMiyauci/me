import { useNotice } from '@/hooks/notice'
import { Transition } from '@headlessui/react'
import loadable from '@loadable/component'
const Snackbar = loadable(() => import('@/components/Notice/Snackbar'))

import type { FC } from 'react'

const Index: FC = () => {
  const [props] = useNotice()

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
        className="fixed bottom-0 w-full z-50 md:bottom-auto md:right-6 md:top-20 md:max-w-sm"
        type={props.type}
      >
        {props.field ?? <></>}
      </Snackbar>
    </Transition>
  )
}

export default Index
