import type { FC, ReactNode } from 'react'

const Index: FC<{ children: ReactNode; tooltip: string }> = ({
  children,
  tooltip
}) => {
  return (
    <span className="tooltip" data-tooltip={tooltip}>
      {children}
    </span>
  )
}

export default Index
