import Base from '@/layouts/Base'
import Global from '@/layouts/Global'
import loadable from '@loadable/component'
import { CHATROOM_TYPES } from '@/../config/constants'

const ChatRoomLayout = loadable(() => import('@/layouts/ChatRoom'))
const ChatLayout = loadable(() => import('@/layouts/Chat'))
const PlainLayout = loadable(() => import('@/layouts/Plain'))

import type { FC, ReactNode } from 'react'
import type { PageProps } from 'gatsby'
import type { PageContext } from 'config/types'

const joinPath = (path: string) => `/chat/${path}/`

const Index: FC<
  {
    children: ReactNode
  } & Omit<PageProps<Record<string, unknown>, PageContext>, 'children'>
> = ({ children, pageContext, location }) => {
  const { originalPath } = pageContext

  const layout = (): JSX.Element => {
    if (CHATROOM_TYPES.map(joinPath).includes(originalPath)) {
      return (
        <ChatRoomLayout
          originalPath={pageContext.originalPath}
          currentPath={location.pathname}
          locale={pageContext.locale}
        >
          {children}
        </ChatRoomLayout>
      )
    } else if (originalPath === '/chat/') {
      return (
        <ChatLayout
          originalPath={pageContext.originalPath}
          currentPath={location.pathname}
          locale={pageContext.locale}
        >
          {children}
        </ChatLayout>
      )
    } else if (originalPath === '/login/') {
      return <PlainLayout>{children}</PlainLayout>
    } else {
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

  return <Global locale={pageContext.locale}>{layout()}</Global>
}

export default Index
