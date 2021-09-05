import { createElement, cloneElement } from 'react'
import { classNames } from '@/utils/class_name'
import type { ReactHTML, ReactElement } from 'react'

type Props<T extends keyof ReactHTML = 'span'> = {
  as?: T
  children: ReactElement
  icon?: ReactElement
  close?: ReactElement
} & JSX.IntrinsicElements[T]

const SnackbarFrame = <T extends keyof ReactHTML>({
  className,
  icon,
  children,
  close,
  as,
  ...props
}: Props<T>): ReactElement => {
  const Child = (
    <>
      <span className={classNames('inline-flex px-2 space-x-3 py-3')}>
        {icon &&
          cloneElement(icon, {
            className: classNames(icon.props.className, 'w-8 h-8')
          })}
        {cloneElement(children, {
          className: classNames(
            children.props.className,
            'flex-1 justify-center flex-col flex'
          )
        })}
      </span>
      {close && close}
    </>
  )
  return createElement(
    as ?? 'span',
    {
      className: classNames('flex md:rounded-md justify-between', className),
      ...props
    },
    Child
  )
}

export default SnackbarFrame
