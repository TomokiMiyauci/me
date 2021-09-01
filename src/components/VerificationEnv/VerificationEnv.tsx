import { FC } from 'react'
import { Verification } from '@/components/VerificationEnv/types'
import { DEFAULT_OS } from '@/components/VerificationEnv/constants'
import OS from '@/components/VerificationEnv/OS'
import Browser from '@/components/VerificationEnv/Browser'
import Package from '@/components/VerificationEnv/Package'
import clipboardCheck from '@iconify/icons-heroicons-outline/clipboard-check'
import { Icon } from '@iconify/react/dist/offline'

const VerificationEnv: FC<Verification & { className?: string }> = ({
  os = DEFAULT_OS,
  packages,
  browser,
  className
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="space-x-2 text-accent">
        <Icon icon={clipboardCheck} className="w-7 h-7" />
        <span className="align-middle text-xl">Verified with</span>
      </h3>

      <div className="flex justify-around">
        <OS {...os} />

        <Browser {...browser} />
      </div>

      <Package {...packages} />
    </div>
  )
}

export default VerificationEnv
