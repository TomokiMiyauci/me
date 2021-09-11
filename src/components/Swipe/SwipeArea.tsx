import type { FC, ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react'
import { classNames } from '@/utils/class_name'
const SwipeArea: FC<
  { children: ReactNode; className?: string } & DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ className, children, ...rest }) => {
  return (
    <div className={classNames('text-center p-4 -m-4', className)} {...rest}>
      {children}
    </div>
  )
}

export default SwipeArea
