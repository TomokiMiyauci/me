import Base from '@/layouts/Base'
import Global from '@/layouts/Global'
import loadable from '@loadable/component'
import LayoutContext from '@/layouts/contexts/layout'
import { CHATROOM_TYPES } from '@/../config/constants'
import { useMemo } from 'react'

const ChatRoomLayout = loadable(() => import('@/layouts/ChatRoom'))
const ChatLayout = loadable(() => import('@/layouts/Chat'))
const PlainLayout = loadable(() => import('@/layouts/Plain'))

import type { FC, ReactNode } from 'react'
import type { PageProps } from 'gatsby'
import type { PageContext } from 'config/types'
import type { LayoutContext as LayoutContextType } from '@/layouts/types'

const joinPath = (path: string) => `/chat/${path}/`

const Index: FC<
  {
    children: ReactNode
  } & Omit<PageProps<Record<string, unknown>, PageContext>, 'children'>
> = ({ children, pageContext, path }) => {
  const { originalPath, locale } = pageContext

  const layoutContext = useMemo<LayoutContextType>(() => {
    return {
      originalPath,
      locale,
      path
    }
  }, [pageContext, path])

  const layout = (): JSX.Element => {
    if (CHATROOM_TYPES.map(joinPath).includes(originalPath)) {
      return <ChatRoomLayout>{children}</ChatRoomLayout>
    } else if (originalPath === '/chat/') {
      return <ChatLayout>{children}</ChatLayout>
    } else if (originalPath === '/login/') {
      return <PlainLayout>{children}</PlainLayout>
    } else {
      return <Base>{children}</Base>
    }
  }

  return (
    <LayoutContext.Provider value={layoutContext}>
      <Global>{layout()}</Global>
    </LayoutContext.Provider>
  )
}

export default Index
