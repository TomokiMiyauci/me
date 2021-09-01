import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import { FC, useState, useMemo, Fragment } from 'react'
import SearchResult from '@/components/Search/SearchResult'
import { useSearchShow } from '@/components/Search/hooks'
import SearchSection from '@/components/Search/SearchSection'
import { PoweredBy } from 'react-instantsearch-dom'
import { Transition } from '@headlessui/react'

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
    <Transition
      show={searchShow}
      as={Fragment}
      enter="transition-all duration-300 ease-out"
      enterFrom="transform translate-y-full opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform translate-y-0"
      leaveTo="transform translate-y-full"
    >
      <div className="p-4 fixed inset-0 z-50 bg-gray-50 dark:bg-blue-gray-900">
        <InstantSearch
          searchClient={searchClient}
          indexName={'Pages'}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchSection
            onClose={toggleSearch}
            className="h-full"
            searchResult={<SearchResult indices={['Pages']} />}
            querying={!!query}
            powerdBy={<PoweredBy />}
          />
        </InstantSearch>
      </div>
    </Transition>
  )
}
export default Index
