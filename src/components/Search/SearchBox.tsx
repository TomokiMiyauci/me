import React, { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import magnify from '@iconify-icons/mdi/magnify'
import close from '@iconify-icons/mdi/close'
import { useMemo } from 'react'

const SearchBox: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    className?: string
    onClear?: () => void
  }
> = ({ className, onClear, ...props }) => {
  const hasValue = useMemo<boolean>(() => !!props.value, [props.value])
  const closeClass = useMemo<string>(
    () => (hasValue ? 'visible' : 'invisible'),
    [hasValue]
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className={`space-x-2 flex justify-between ${className}`}
    >
      <input
        type="search"
        placeholder="Search"
        aria-label="Search"
        autoFocus
        className="bg-transparent text-lg"
        {...props}
      />

      <span className="space-x-2">
        <button onClick={onClear} className={`${closeClass}`}>
          <Icon icon={close} className="w-7 h-7" />
        </button>
        <Icon icon={magnify} className="w-7 h-7" />
      </span>
    </form>
  )
}

export default SearchBox
