import ChatLayout from '@/layout/Chat'
import Layout from '@/components/Layout'
import Plain from '@/layout/Plain'

import type { FC, ReactNode } from 'react'
import type { PageProps } from 'gatsby'
import type { PageContext } from 'config/types'

const Index: FC<
  {
    children: ReactNode
  } & Omit<PageProps<Record<string, unknown>, PageContext>, 'children'>
> = ({ children, pageContext, location }) => {
  const { originalPath } = pageContext
  switch (originalPath) {
    case '/chat/': {
      return <ChatLayout>{children}</ChatLayout>
    }
    case '/login/': {
      return <Plain>{children}</Plain>
    }

    default: {
      return (
        <Layout
          originalPath={pageContext.originalPath}
          currentPath={location.pathname}
          locale={pageContext.locale}
        >
          {children}
        </Layout>
      )
    }
  }
}

export default Index
