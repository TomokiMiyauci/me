import { FC, ReactNode } from 'react'

const Placeholder: FC<{
  placeholder: ReactNode
  children: ReactNode
  placeholding: boolean
}> = ({ placeholder, children, placeholding }) => {
  return <>{placeholding ? children : placeholder}</>
}

export default Placeholder
