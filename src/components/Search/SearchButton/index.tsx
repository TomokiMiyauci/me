import SearchButton from '@/components/Search/SearchButton/SearchButton'
import Context from '@/components/Search/context'
import loadable from '@loadable/component'
import { useContext } from 'react'
import { useShortcut } from '@/hooks/event_listener'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'

const Tooltip = loadable(() => import('@/components/Tooltip'))

import type { FC } from 'react'

const Index: FC = () => {
  const [_, { on: showDialog }] = useContext(Context)
  const { safeLogEvent } = useSafeLogEvent()

  const loggedShowDialog = (): void => {
    showDialog()
    console.log(showDialog)
    safeLogEvent((analytics, logEvent) =>
      logEvent(analytics, 'select_content', {
        content_type: 'search',
        action: 'show'
      })
    )
  }

  useShortcut(
    {
      metaKey: true,
      code: 'KeyK'
    },
    loggedShowDialog,
    []
  )

  return (
    <Tooltip title="Search ⌘K">
      <SearchButton
        className="btn-circle transition-colors duration-300"
        onClick={loggedShowDialog}
      />
    </Tooltip>
  )
}

export default Index
