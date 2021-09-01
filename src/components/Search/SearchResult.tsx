import { Link, GatsbyLinkProps } from 'gatsby'
import { FC } from 'react'
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet
} from 'react-instantsearch-dom'
import { StateResultsProvided } from 'react-instantsearch-core'
import { useSearchShow } from '@/components/Search/hooks'

const _HitCount = connectStateResults(
  ({
    searchResults,
    props
  }: StateResultsProvided & { props: { className?: string } }) => {
    const hit = searchResults.nbHits

    return <HitCount hitCount={hit} className={props.className} />
  }
)

const HitCount: FC<{ hitCount: number; className?: string }> = ({
  hitCount,
  className
}) => {
  return <div className={`${className}`}>{hitCount}</div>
}

const PageHit: FC<GatsbyLinkProps<{}> & { hit: Doc }> = ({
  hit,
  className,
  to,
  ...props
}) => {
  const [_, toggleShow] = useSearchShow()
  return (
    <Link
      className={`p-1 ${className}`}
      to={hit.slug}
      onClick={toggleShow}
      {...props}
    >
      <h4 className="text-xl">
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </Link>
  )
}

type Doc = {
  title: string
  slug: string
  objectID: string
  excerpt: string
}

const HitsInIndex: FC<{ index: string }> = ({ index }) => {
  return (
    <Index indexName={index}>
      <_HitCount className="text-right" />

      <h2>Article</h2>
      <Hits<Doc> hitComponent={PageHit} />
    </Index>
  )
}

const SearchResult: FC<{ className?: string; indices: string[] }> = ({
  indices,
  className
}) => {
  return (
    <div className={`${className}`}>
      {indices.map((index) => (
        <HitsInIndex index={index} key={index} />
      ))}
    </div>
  )
}

export default SearchResult
