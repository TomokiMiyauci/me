import Base from '@/layouts/Base'
import Global from '@/layouts/Global'
import loadable from '@loadable/component'
import LayoutContext from '@/layouts/contexts/layout'
import { useMemo } from 'react'

const ChatRoomLayout = loadable(() => import('@/layouts/ChatRoom'))
const ChatLayout = loadable(() => import('@/layouts/Chat'))
const PlainLayout = loadable(() => import('@/layouts/Plain'))

import type { FC, ReactNode } from 'react'
import type { PageProps } from 'gatsby'
import type { PageContext } from 'config/types'
import type { LayoutContext as LayoutContextType } from '@/layouts/types'

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

  const layout = useMemo<JSX.Element>(() => {
    if (originalPath === '/chat/public/[roomId]/') {
      return <ChatRoomLayout>{children}</ChatRoomLayout>
    } else if (originalPath === '/chat/') {
      return <ChatLayout>{children}</ChatLayout>
    } else if (originalPath === '/login/') {
      return <PlainLayout>{children}</PlainLayout>
    } else {
      return <Base>{children}</Base>
    }
  }, [pageContext])

  return (
    <LayoutContext.Provider value={layoutContext}>
      <Global>{layout}</Global>
    </LayoutContext.Provider>
  )
}

export default Index
