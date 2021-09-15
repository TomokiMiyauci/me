import Base from '@/layouts/Base'
import Global from '@/layouts/Global'
import loadable from '@loadable/component'

const ChatLayout = loadable(() => import('@/layouts/Chat'))
const PlainLayout = loadable(() => import('@/layouts/Plain'))

import type { FC, ReactNode } from 'react'
import type { PageProps } from 'gatsby'
import type { PageContext } from 'config/types'

const Index: FC<
  {
    children: ReactNode
  } & Omit<PageProps<Record<string, unknown>, PageContext>, 'children'>
> = ({ children, pageContext, location }) => {
  const { originalPath } = pageContext

  const layout = (): JSX.Element => {
    switch (originalPath) {
      case '/chat/': {
        return <ChatLayout>{children}</ChatLayout>
      }
      case '/login/': {
        return <PlainLayout>{children}</PlainLayout>
      }

      default: {
        return (
          <Base
            originalPath={pageContext.originalPath}
            currentPath={location.pathname}
            locale={pageContext.locale}
          >
            {children}
          </Base>
        )
      }
    }
  }

  return <Global>{layout()}</Global>
}

export default Index
