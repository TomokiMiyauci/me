import { createElement } from 'react'
import { classNames } from '@/utils/class_name'
import type { ReactHTML } from 'react'

type Props<T extends keyof ReactHTML = 'span'> = {
  as?: T
  className?: string
}
const SkeltonLoader = <T extends keyof ReactHTML>({
  as = 'span',
  className
}: Props<T>): JSX.Element => {
  return createElement(as, {
    className: classNames(
      'bg-opacity-40 animate-pulse bg-gray-400 cursor-wait',
      className
    )
  })
}

export default SkeltonLoader
