import { createElement } from 'react'
import { classNames } from '@/utils/class_name'

const Card = <T extends keyof JSX.IntrinsicElements>({
  as,
  className,
  ...props
}: {
  as?: T
} & JSX.IntrinsicElements[T]) => {
  return createElement(as ?? 'div', {
    className: classNames(
      'border dark:border-blue-gray-700 bg-gray-50 dark:bg-blue-gray-800 rounded-xl shadow-md hover:shadow-xl',
      className
    ),
    ...props
  })
}

export default Card
