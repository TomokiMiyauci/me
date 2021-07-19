import React, { FC } from 'react'
import { Icon } from '@iconify/react'

const IconWith: FC<{ icon: string; className?: string }> = ({
  icon,
  className,
  children
}) => {
  return (
    <>
      <Icon icon={icon} className={className} />
      {children}
    </>
  )
}

export default IconWith
