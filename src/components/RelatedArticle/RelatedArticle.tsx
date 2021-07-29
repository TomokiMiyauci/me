import React, { FC, Reducer, useReducer, useMemo } from 'react'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline'
import ArticleHeadline from '@/components/ArticleHeadline'

type DataType = 'RECENT'

type State = {
  type: DataType
}

type Action = {
  type: 'recent'
}

const initialState: State = { type: 'RECENT' }
const reducer: Reducer<State, Action> = (state, action) => {
  return { type: 'RECENT' }
}

const RelatedArticle: FC<{ articles: ArticleHeadlineProps[] }> = ({
  articles
}) => {
  const [state] = useReducer(reducer, initialState)

  const data = useMemo(() => {
    switch (state.type) {
      case 'RECENT': {
        return articles
      }
    }
  }, [state.type])

  return (
    <>
      <div className="p-2 flex justify-center">
        <button className="text-accent bg-gray-100 dark:bg-blue-gray-800 text-lg px-3 py-1 rounded-full">
          Recent
        </button>
      </div>

      <ul className="-mx-2 space-y-2">
        {data.map((articleHeadlineProps) => {
          return (
            <li key={articleHeadlineProps.to}>
              <ArticleHeadline {...articleHeadlineProps} />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default RelatedArticle
