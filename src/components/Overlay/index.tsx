import { classNames } from '@/utils/class_name'
import { Transition, Popover, TransitionClasses } from '@headlessui/react'
import { forwardRef } from 'react'
import type { ReactHTML } from 'react'

import { Fragment, ReactElement } from 'react'

type Props<T extends keyof ReactHTML = 'span'> = {
  children: ReactElement | ReactElement[]
  show: boolean
  className?: string
  as?: T
} & TransitionClasses &
  JSX.IntrinsicElements[T]

const Index = forwardRef<HTMLDivElement, Props<'div'>>(
  (
    {
      children,
      className,
      show,
      as,
      enter,
      enterFrom,
      enterTo,
      entered,
      leave,
      leaveFrom,
      leaveTo,
      ...rest
    },
    ref
  ) => {
    return (
      <Popover as={Fragment}>
        <Transition
          show={show}
          as={Fragment}
          {...{ enter, enterFrom, enterTo, entered, leave, leaveFrom, leaveTo }}
        >
          <Popover.Panel
            as={as ?? 'div'}
            className={classNames(className)}
            ref={ref}
            {...rest}
          >
            {children}
          </Popover.Panel>
        </Transition>
      </Popover>
    )
  }
)

export default Index
