import Tooltip from '@/components/Tooltip'
import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import { useShortcut } from '@/hooks/event_listener'
import { useContext } from 'react'
import type { FC } from 'react'

const Index: FC = () => {
  const [_, changeShow] = useContext(Context)
  useShortcut({ metaKey: true, code: 'KeyJ' }, () => changeShow(true), [])

  return (
    <Tooltip title="Accent color ⌘J">
      <ButtonAccentColor onClick={() => changeShow(true)} />
    </Tooltip>
  )
}

export default Index
