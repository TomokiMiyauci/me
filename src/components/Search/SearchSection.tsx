import React, { FC, ReactChild } from 'react'
import SearchField from '@/components/Search/SearchField'

const SearchSection: FC<{
  className?: string
  onClose: () => void
  querying?: boolean
  searchResult: ReactChild
  powerdBy: ReactChild
}> = ({ className, onClose, searchResult, powerdBy, querying }) => {
  return (
    <section className={`flex flex-col ${className}`}>
      <div className="flex space-x-4 pb-2">
        <SearchField onClose={onClose} searchClassName="flex-1" />
      </div>
      <hr />
      <div className="flex-1 overflow-y-scroll">{querying && searchResult}</div>
      <br />
      {powerdBy}
    </section>
  )
}

export default SearchSection
