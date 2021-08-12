import { useState, useEffect } from 'react'
import { isEmpty } from '@/utils/is'

const getQueryString = (key: string, search: string): string =>
  new URLSearchParams(search).get(key) ?? ''

const useQueryString = <T extends string>(key: string, location: Location) => {
  const init = getQueryString(key, location.search) as T | ''
  const [queryString, changeParam] = useState<T | ''>(init)

  const changeQueryString = (q?: T): void => {
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
