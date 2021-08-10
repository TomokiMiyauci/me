import React, { FC, useMemo, useState, useEffect, ReactNode } from 'react'
import { useDarkMode } from '@/hooks/dark_mode'
import sun from '@iconify/icons-jam/sun'
import { Icon } from '@iconify/react/dist/offline'
import moon from '@iconify/icons-bx/bx-moon'

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

const OnlyClient: FC<{ placeholder?: ReactNode }> = ({
  children,
  placeholder
}) => {
  const isClient = useIsClient()

  return <>{isClient ? <>{children}</> : <>{placeholder}</>}</>
}

const DarkMode: FC = () => {
  const { value, toggle } = useDarkMode()
  const icon = useMemo(() => {
    return value ? moon : sun
  }, [value])

  return (
    <OnlyClient placeholder={<span className="w-[32px] h-[32px]" />}>
      <button
        aria-label="Switch dark mode"
        className="text-accent"
        onClick={toggle}
      >
        <Icon icon={icon} className="w-8 h-8" />
      </button>
    </OnlyClient>
  )
}

export default DarkMode
