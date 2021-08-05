import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import React, { FC, useState, useMemo } from 'react'
import SearchResult from '@/components/Search/SearchResult'
import { useSearchShow } from '@/components/Search/hooks'
import SearchSection from '@/components/Search/SearchSection'
import { PoweredBy } from 'react-instantsearch-dom'

const Index: FC = () => {
  const [searchShow, toggleSearch] = useSearchShow()
  const [query, setQuery] = useState()
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID!,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY!
      ),
    []
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={'Pages'}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      {searchShow && (
        <SearchSection
          onClose={toggleSearch}
          className="fixed p-4 inset-0 z-50 bg-white h-screen w-screen"
          searchResult={<SearchResult indices={['Pages']} />}
          querying={!!query}
          powerdBy={<PoweredBy />}
        />
      )}
    </InstantSearch>
  )
}
export default Index
