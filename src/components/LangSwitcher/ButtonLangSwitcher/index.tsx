import ButtonLangSwitcher from '@/components/LangSwitcher/ButtonLangSwitcher/ButtonLangSwitcher'
import { useContext } from 'react'
import { useEventListener } from '@/hooks/event_listener'
import Context from '@/components/LangSwitcher/context'
import type { FC } from 'react'

const Index: FC = () => {
  const [_, changeShow] = useContext(Context)
  useEventListener(
    'keydown',
    ({ metaKey, code }) => {
      if (metaKey && code === 'KeyI') {
        changeShow(true)
      }
    },
    []
  )
  return (
    <span className="tooltip" data-tooltip="Translate ⌘I">
      <ButtonLangSwitcher
        onClick={() => {
          changeShow(true)
        }}
      />
    </span>
  )
}

export default Index
