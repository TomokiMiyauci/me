import SearchButton from '@/components/Search/SearchButton/SearchButton'
import Context from '@/components/Search/context'
import { useContext, useEffect } from 'react'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'
import { useShortcut } from 'react-hookable'
import Tooltip from '@/components/Tooltip'

import type { FC } from 'react'

const Index: FC = () => {
  const [_, { on: showDialog }] = useContext(Context)
  const { safeLogEvent } = useSafeLogEvent()
  const { bind } = useShortcut()

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

  useEffect(() => {
    bind(
      {
        cmd: true,
        key: 'k'
      },
      loggedShowDialog
    )
  }, [])

  return (
    <Tooltip title="Search ⌘k">
      <SearchButton
        className="btn-circle transition-colors duration-300"
        onClick={loggedShowDialog}
      />
    </Tooltip>
  )
}

export default Index
