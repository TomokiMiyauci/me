import ButtonLangSwitcher from '@/components/LangSwitcher/ButtonLangSwitcher/ButtonLangSwitcher'
import { useContext } from 'react'
import Context from '@/components/LangSwitcher/context'
import type { FC } from 'react'

const Index: FC = () => {
  const [_, changeShow] = useContext(Context)
  return (
    <span className="tooltip" data-tooltip="Translate">
      <ButtonLangSwitcher
        onClick={() => {
          changeShow(true)
        }}
      />
    </span>
  )
}

export default Index
