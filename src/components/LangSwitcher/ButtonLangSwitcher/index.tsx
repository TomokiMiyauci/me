import ButtonLangSwitcher from '@/components/LangSwitcher/ButtonLangSwitcher/ButtonLangSwitcher'
import { useContext } from 'react'
import { useShortcut } from '@/hooks/event_listener'
import Context from '@/components/LangSwitcher/context'
import type { FC } from 'react'

const Index: FC = () => {
  const [_, { on: showDialog }] = useContext(Context)

  useShortcut(
    {
      metaKey: true,
      code: 'KeyI'
    },
    showDialog,
    []
  )
  return (
    <span className="tooltip" data-tooltip="Translate ⌘I">
      <ButtonLangSwitcher onClick={showDialog} />
    </span>
  )
}

export default Index
