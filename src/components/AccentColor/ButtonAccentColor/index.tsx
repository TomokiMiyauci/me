import Tooltip from '@/components/Tooltip'
import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import { useContext } from 'react'
import type { FC } from 'react'

const Index: FC = () => {
  const [_, changeShow] = useContext(Context)
  return (
    <Tooltip title="Accent color">
      <ButtonAccentColor onClick={() => changeShow(true)} />
    </Tooltip>
  )
}

export default Index
