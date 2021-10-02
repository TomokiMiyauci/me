import { classNames } from '@/utils/class_name'
import { Helmet } from 'react-helmet'
import loadable from '@loadable/component'
const PortalBody = loadable(() => import('@/components/Portal/PortalBody'))
const Overlay = loadable(() => import('@/components/Overlay/Overlay'))
import type { FC, ReactNode } from 'react'
import type { Transition } from '@headlessui/react'

const Index: FC<
  { children: ReactNode } & JSX.IntrinsicElements['div'] &
    Parameters<typeof Transition>[number]
> = ({ children, className, ...props }) => {
  return (
    <PortalBody>
      <Overlay
        className={classNames('cursor-pointer p-4 md:p-40', className)}
        {...props}
      >
        <Helmet bodyAttributes={{ 'data-fullscreen': 'true' }} />
        {children}
      </Overlay>
    </PortalBody>
  )
}

export default Index
