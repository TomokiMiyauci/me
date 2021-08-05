import React, { FC } from 'react'
import { Browser } from '@/components/VerificationEnv/types'
import { Icon } from '@iconify/react/dist/offline'
import chromeOutline from '@iconify/icons-teenyicons/chrome-outline'
import { useMemo } from 'react'

const BrowserComponent: FC<Partial<Browser> & { className?: string }> = ({
  name,
  className
}) => {
  const hasBrowser = useMemo<boolean>(() => !!name, [name])
  const iconClass = useMemo<string>(
    () => (hasBrowser ? '' : 'text-gray-500'),
    [hasBrowser]
  )
  const title = useMemo(() => (hasBrowser ? name : 'None'), [hasBrowser])
  const titleClass = useMemo<string>(
    () => (hasBrowser ? '' : 'text-gray-500'),
    [hasBrowser]
  )
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <h3 className="self-start">Browser</h3>
      <Icon icon={chromeOutline} className={`w-24 px-2 h-24 ${iconClass}`} />
      <p className={titleClass}>{title}</p>
    </span>
  )
}

export default BrowserComponent
