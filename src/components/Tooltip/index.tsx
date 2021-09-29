import { classNames } from '@/utils/class_name'
import type { FC, ReactNode } from 'react'

const Index: FC<{ children: ReactNode; title: string; className?: string }> = ({
  children,
  className,
  title
}) => {
  return (
    <span className={classNames('tooltip', className)} data-tooltip={title}>
      {children}
    </span>
  )
}

export default Index
