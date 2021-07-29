import React, { FC, Reducer, useReducer, useMemo } from 'react'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline'
import ArticleHeadline from '@/components/ArticleHeadline'
import { Icon } from '@iconify/react/dist/offline'
import burstNew from '@iconify-icons/foundation/burst-new'
import tag from '@iconify-icons/codicon/tag'
import { isLength0 } from '@miyauci/is-valid'
import Tag from '@/components/Tag'
import { iconMeta } from '@/utils/tag'

type DataType = 'RECENT' | 'TAG'

type State = {
  type: DataType
}

type Action = {
  type: 'recent' | 'tag'
}

const initialState: State = { type: 'RECENT' }
const reducer: Reducer<State, Action> = (_, { type }) => {
  switch (type) {
    case 'recent': {
      return {
        type: 'RECENT'
      }
    }
    case 'tag': {
      return {
        type: 'TAG'
      }
    }
  }
}

const RelatedArticle: FC<{
  recentArticles: ArticleHeadlineProps[]
  sameTagArticles: ArticleHeadlineProps[]
  tags?: string[]
}> = ({ recentArticles, sameTagArticles, tags = [] }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const data = useMemo(() => {
    switch (state.type) {
      case 'RECENT': {
        return recentArticles
      }

      case 'TAG': {
        return sameTagArticles
      }
    }
  }, [state.type])

  return (
    <>
      <div className="p-2 flex space-x-4 justify-center">
        <button
          onClick={() =>
            dispatch({
              type: 'recent'
            })
          }
          className={`bg-gray-100 hover:shadow hover:opacity-80 transition duration-300 space-x-2 dark:bg-blue-gray-800 text-lg px-3 py-1 rounded-full ${
            state.type === 'RECENT' && 'text-accent'
          }`}
        >
          <Icon icon={burstNew} className="w-7 h-7" />
          <span className="align-middle">Recent</span>
        </button>

        {!isLength0(sameTagArticles) && (
          <button
            onClick={() =>
              dispatch({
                type: 'tag'
              })
            }
            className={`bg-gray-100 hover:shadow hover:opacity-80 transition duration-300 flex items-center space-x-2 dark:bg-blue-gray-800 text-lg px-3 py-1 rounded-full ${
              state.type === 'TAG' && 'text-accent'
            }`}
          >
            <Icon icon={tag} className="w-7 h-7" />
            <span className="align-middle">Tag</span>
            <span className="-space-x-4">
              {tags.map((tag) => {
                const { tagIcon, wellKnown } = iconMeta(tag)

                return (
                  <Tag
                    className={wellKnown ? '' : 'hidden'}
                    key={tag}
                    tag={tagIcon}
                  />
                )
              })}
            </span>
          </button>
        )}
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
