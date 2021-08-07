import { useState, useEffect } from 'react'
import { isEmpty } from '@miyauci/is-valid'

const getQueryString = (key: string, search: string): string =>
  new URLSearchParams(search).get(key) ?? ''

const useQueryString = (key: string, location: Location) => {
  const init = getQueryString(key, location.search)
  const [queryString, changeParam] = useState<string>(init)

  const changeQueryString = (q?: string): void => {
    changeParam(q ?? '')
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    if (queryString) {
      searchParams.set(key, queryString)
    } else {
      searchParams.delete(key)
    }
    const _search = searchParams.toString()

    window.history.replaceState(
      { [key]: queryString },
      '',
      isEmpty(_search) ? location.pathname : `?${_search}`
    )
  }, [queryString])

  return [queryString, changeQueryString] as const
}

export { useQueryString }
