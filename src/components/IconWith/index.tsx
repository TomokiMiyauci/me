import React, { FC } from 'react'
import { Icon } from '@iconify/react/dist/offline'

const IconWith: FC<{ icon: object; className?: string }> = ({
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
