import React, { FC } from 'react'
import { OS } from '@/components/VerificationEnv/types'
import { Icon } from '@iconify/react/dist/offline'
import appleOutlined from '@iconify/icons-ant-design/apple-outlined'

const OScomponent: FC<OS & { className?: string }> = ({
  name,
  family,
  version,
  className
}) => (
  <span className={`inline-flex flex-col items-center ${className}`}>
    <h3 className="self-start">OS</h3>
    <Icon icon={appleOutlined} className="w-24 h-24" />
    <p>{name}</p>
    {family}: {version}
  </span>
)

export default OScomponent
