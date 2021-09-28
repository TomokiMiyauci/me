import Suspense from '@/components/Suspense'
import loadable from '@loadable/component'
import SkeltonLoader from '@/components/SkeltonLoader/SkeltonLoader'
import { Icon } from '@iconify/react/dist/offline'
import { classNames } from '@/utils/class_name'

import type { IconifyIcon } from '@iconify/react'

const IconSkeltonLoader = ({
  className,
  fallbackClassName,
  iconClassName,
  icon,
  delay
}: {
  className?: string
  fallbackClassName?: string
  iconClassName?: string
  icon: () => Promise<{ default: IconifyIcon }>
  delay?: number
}) => {
  const LazyIcon = loadable.lib(icon)

  return (
    <Suspense
      fallback={
        <SkeltonLoader
          className={classNames(
            'inline-block align-middle',
            className,
            fallbackClassName
          )}
        />
      }
      delay={delay}
    >
      <LazyIcon>
        {({ default: icon }) => {
          return (
            <Icon
              icon={icon}
              className={classNames(className, iconClassName)}
            />
          )
        }}
      </LazyIcon>
    </Suspense>
  )
}

export default IconSkeltonLoader
