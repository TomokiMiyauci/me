import type { FC, ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react'

const SwipeArea: FC<
  { children: ReactNode; className?: string } & DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ className, children, ...rest }) => {
  return (
    <div className="text-center md:hidden p-4 -m-4" {...rest}>
      {children}
    </div>
  )
}

export default SwipeArea
