import Tooltip from '@/components/Tooltip'
import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import { useEventListener } from '@/hooks/event_listener'
import { useContext } from 'react'
import type { FC } from 'react'

const Index: FC = () => {
  const [_, changeShow] = useContext(Context)
  useEventListener(
    'keydown',
    ({ metaKey, code }) => {
      if (metaKey && code === 'KeyJ') {
        changeShow(true)
      }
    },
    []
  )
  return (
    <Tooltip title="Accent color ⌘J">
      <ButtonAccentColor onClick={() => changeShow(true)} />
    </Tooltip>
  )
}

export default Index
