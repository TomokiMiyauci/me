import React, { FC } from 'react'
import SearchBox from '@/components/Search/SearchBox'
import close from '@iconify-icons/mdi/arrow-back'
import { Icon } from '@iconify/react/dist/offline'
import { connectSearchBox } from 'react-instantsearch-dom'

const _SearchBox = connectSearchBox(
  ({ refine, currentRefinement, className }) => {
    const onClear = (): void => {
      refine('')
    }
    return (
      <SearchBox
        value={currentRefinement}
        onChange={({ target }) => refine(target.value)}
        onClear={onClear}
        className={`inline ${className}`}
      />
    )
  }
)

const SearchField: FC<{
  searchClassName?: string
  closeClassName?: string
  onClose: () => void
}> = ({ searchClassName, closeClassName, onClose }) => {
  return (
    <>
      <button onClick={onClose} className={`${closeClassName}`}>
        <Icon className="w-7 h-7" icon={close} />
      </button>

      <_SearchBox className={`${searchClassName}`} />
    </>
  )
}

export default SearchField
