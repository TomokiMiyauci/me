import { useContext } from 'react'
import SearchContext from '@/components/Search/context'

const useSearchShow = () => useContext(SearchContext)

export { useSearchShow }
