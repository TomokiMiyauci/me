import type { FC, ReactNode } from 'react'

const Plain: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export default Plain
