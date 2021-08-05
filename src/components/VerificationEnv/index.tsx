import React, { FC } from 'react'
import VerificationEnv from '@/components/VerificationEnv/VerificationEnv'
import type { Verification } from '@/components/VerificationEnv/types'

const Index: FC<Verification> = (props) => {
  return (
    <VerificationEnv
      {...props}
      className="p-2 bg-gray-100 dark:bg-blue-gray-800 rounded-md"
    />
  )
}

export default Index
