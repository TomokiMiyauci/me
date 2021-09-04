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
      className={classNames('flex md:rounded-md justify-between', className)}
    >
      <span className={classNames('inline-flex px-2 space-x-3 py-3')}>
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
      </span>
      {close && close}
    </span>
  )
}

export default SnackbarFrame
