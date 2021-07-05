import React, { FC, useState, useEffect, ReactNode } from 'react'
import useDarkMode from 'use-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

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
  const { value, toggle } = useDarkMode(undefined, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

  return (
    <OnlyClient placeholder={<span className="w-[30px] h-[30px]" />}>
      <DarkModeSwitch
        checked={value}
        sunColor="var(--accent-color)"
        moonColor="var(--accent-color)"
        onChange={toggle}
        size={30}
      />
    </OnlyClient>
  )
}

export default DarkMode
