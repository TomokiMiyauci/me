import { FC, cloneElement } from 'react'
import { classNames } from '@/utils/class_name'

const SnackbarFrame: FC<{
  icon?: JSX.Element
  close?: JSX.Element
  children: JSX.Element
  className?: string
}> = ({ className, icon, children, close }) => {
  return (
    <span
      className={`inline-flex space-x-4 md:rounded-md px-2 py-3 ${className}`}
    >
      {icon &&
        cloneElement(icon, {
          className: classNames(icon.props.className, 'w-8 h-8')
        })}
      {cloneElement(children, {
        className: classNames(
          children.props.className,
          'flex-1 items-center flex'
        )
      })}

      {close && close}
    </span>
  )
}

export default SnackbarFrame
