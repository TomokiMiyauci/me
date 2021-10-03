import Tooltip from '@/components/Tooltip'
import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import { useShortcut } from 'react-hookable'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'
import { useContext } from 'react'
import type { FC } from 'react'

const Index: FC = () => {
  const [_, { on: showDialog }] = useContext(Context)
  const { safeLogEvent } = useSafeLogEvent()

  useShortcut(
    {
      cmd: true,
      key: 'j'
    },
    ({ code, metaKey, shiftKey, ctrlKey, key, altKey }) => {
      showDialog()
      safeLogEvent((analytics, logEvent) =>
        logEvent(analytics, 'shortcut', {
          code,
          metaKey,
          shiftKey,
          ctrlKey,
          key,
          altKey
        })
      )
    }
  )

  return (
    <Tooltip title="Accent color ⌘j">
      <ButtonAccentColor onClick={showDialog} />
    </Tooltip>
  )
}

export default Index
