import PoweredBy from '@/components/Search/PoweredBy'
import Swipe from '@/components/Swipe'
import algoliasearch from 'algoliasearch/lite'
import { useSearchShow } from '@/components/Search/hooks'
import back from '@iconify-icons/mdi/arrow-back'
import close from '@iconify-icons/mdi/close'
import magnify from '@iconify-icons/mdi/text-box-search-outline'
import { useEffect } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import { useAsyncMemo } from 'use-async-memo'
import { LocalizedLink } from 'gatsby-theme-i18n'
import { useState, useMemo, useRef } from 'react'
import { useSafeLogEvent } from '@/hooks/analytics'

import type { SearchIndex, SearchClient } from 'algoliasearch/lite'
import type { SearchResponse } from '@algolia/client-search'
import type { FC, MouseEventHandler } from 'react'
import type { Locale } from 'config/types'

type SearchResult = {
  slug: string
  title: string
  excerpt: string
}

const Index: FC<{ locale: Locale }> = ({ locale }) => {
  const [_, changeShow] = useSearchShow()
  const [query, setQuery] = useState<string>('')
  const { safeLogEvent } = useSafeLogEvent()
  const ref = useRef<HTMLInputElement>(null)

  const searchClient = useMemo<SearchClient>(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID!,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY!
      ),
    []
  )

  const clearSearch = (): void => {
    setQuery('')
    safeLogEvent((analytics, logEvent) => {
      logEvent(analytics, 'select_content', {
        content_type: 'search_clear',
        action: 'clear',
        target: 'search'
      })
    })
  }

  const searchIndex = useMemo<SearchIndex>(
    () => searchClient.initIndex('Pages'),
    [searchClient]
  )

  const handleClick: MouseEventHandler = () => {
    changeShow(false)
    safeLogEvent((analytics, logEvent) =>
      logEvent(analytics, 'engagement', {
        event: 'click',
        content_type: 'search_result'
      })
    )
  }

  const fn = ({ code }: KeyboardEvent) => {
    if (code === 'Escape') {
      changeShow(false)
      safeLogEvent((analytics, logEvent) => {
        logEvent(analytics, 'clear_content', {
          event: 'keydown',
          key: code,
          target: 'search'
        })
      })
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', fn)
    return () => {
      document.removeEventListener('keydown', fn)
    }
  }, [])

  useEffect(() => {
    if (!query) return

    safeLogEvent((analytics, logEvent) => {
      logEvent(analytics, 'search', {
        search_term: query,
        search_by: 'algolia'
      })
    })
  }, [query])

  const result = useAsyncMemo<
    SearchResponse<SearchResult> | undefined
  >(async () => {
    if (!query) return undefined
    return await searchIndex.search<SearchResult>(query, {
      facetFilters: `locale:${locale}`
    })
  }, [query, locale])

  return (
    <>
      <Swipe />
      <div className="flex items-center space-x-2 px-3 py-1">
        <span className="tooltip" data-tooltip="Close">
          <button
            className="hover:text-accent transition-colors duration-300"
            onClick={() => changeShow(false)}
          >
            <Icon className="w-7 h-7" icon={back} />
          </button>
        </span>

        <input
          placeholder="Search"
          aria-label="Search"
          spellCheck="false"
          autoFocus
          required
          maxLength={100}
          ref={ref}
          className="flex-1 bg-transparent py-3 pl-2 h-full "
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        />

        {!!query && (
          <span className="tooltip" data-tooltip="Clear">
            <button
              className="hover:text-accent transition-colors duration-300"
              onClick={() => {
                clearSearch()
                ref.current?.focus()
              }}
            >
              <Icon className="w-7 h-7" icon={close} />
            </button>
          </span>
        )}

        <div
          className="tooltip hidden md:block"
          data-tooltip="Close on keydown escape"
        >
          <button
            onClick={() => changeShow(false)}
            className="border dark:border-blue-gray-700 hover:shadow transition-shadow duration-300 rounded-md bg-gray-100 dark:bg-blue-gray-900 text-gray-400 px-1"
          >
            esc
          </button>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-blue-gray-700" />

      <div className="text-right px-2 py-0.5">
        {result && <span>{result.nbHits} Hits</span>}
      </div>

      <div className="flex-1 flex overflow-y-scroll items-center justify-center">
        {!query && (
          <Icon
            icon={magnify}
            className="h-24 w-24 text-accent animate-pulse"
          />
        )}
        <ul className="space-y-3 px-2 pb-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-accent">
          {result &&
            result.hits.map(({ title, objectID, slug, excerpt }) => {
              return (
                <li key={objectID}>
                  <LocalizedLink
                    onClick={handleClick}
                    language={locale}
                    to={slug}
                  >
                    <h2 className="line-clamp-1 font-bold">{title}</h2>
                    <p className="line-clamp-2">{excerpt}</p>
                  </LocalizedLink>
                </li>
              )
            })}
        </ul>
      </div>

      <hr className="border-gray-200 dark:border-blue-gray-700" />

      <div className="text-right py-1.5 px-3">
        <PoweredBy />
      </div>
    </>
  )
}
export default Index
