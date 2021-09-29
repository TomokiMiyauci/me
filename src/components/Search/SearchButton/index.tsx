import SearchButton from '@/components/Search/SearchButton/SearchButton'
import { useSearchShow } from '@/components/Search/hooks'
import { useEffect } from 'react'
import { makeEventListenerSet } from '@/utils/evnet_listener'

import type { FC } from 'react'

const Index: FC = () => {
  const [_, changeShow] = useSearchShow()

  const { register, unregister } = makeEventListenerSet(
    window,
    'keydown',
    ({ metaKey, key }: KeyboardEvent) => {
      if (metaKey && key === 'k') {
        changeShow(true)
      }
    }
  )

  useEffect(() => {
    register()

    return unregister
  }, [])

  return (
    <span className="tooltip" data-tooltip="Search ⌘K">
      <SearchButton
        className="btn-circle transition-colors duration-300"
        onClick={() => changeShow(true)}
      />
    </span>
  )
}

export default Index
