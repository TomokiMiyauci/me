import React, { FC } from 'react'
import type { ArticleHeadlineProps } from '@/components/ArticleHeadline/types'
import { Icon } from '@iconify/react/dist/offline'
import burstNew from '@iconify-icons/foundation/burst-new'
import fire from '@iconify-icons/mdi/fire'
import tag from '@iconify-icons/codicon/tag'
import { isLength0 } from '@/utils/is'
import Tag from '@/components/Tag'
import { iconMeta } from '@/utils/tag'
import { Tab } from '@headlessui/react'
import { classNames } from '@/utils/class_name'
import ArticleHeadline from '@/components/ArticleHeadline'

const RelatedArticle: FC<{
  recentArticles: ArticleHeadlineProps[]
  hotArticles: ArticleHeadlineProps[]
  sameTagArticles: ArticleHeadlineProps[]
  tags?: string[]
}> = ({ recentArticles, hotArticles, sameTagArticles, tags = [] }) => {
  return (
    <>
      <Tab.Group>
        <Tab.List className="flex overflow-x-scroll flex-nowrap p-1 space-x-1 bg-gray-200/50 dark:bg-blue-gray-800 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full p-1 space-x-2 whitespace-nowrap font-medium rounded-lg transition duration-300',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-accent ring-white dark:ring-blue-gray-900 hover:bg-opacity-50',
                selected
                  ? 'bg-white dark:bg-blue-gray-900 shadow text-accent'
                  : 'hover:bg-white/80 dark:hover:bg-blue-gray-900/80 hover:text-accent'
              )
            }
          >
            <Icon icon={burstNew} className="w-7 h-7" />
            <span className="align-middle">Recent</span>
          </Tab>
          {!isLength0(hotArticles) && (
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full p-1 whitespace-nowrap space-x-2 font-medium rounded-lg transition duration-300',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-accent ring-white dark:ring-blue-gray-900 hover:bg-opacity-50',
                  selected
                    ? 'bg-white dark:bg-blue-gray-900 shadow text-accent'
                    : 'hover:bg-white/80 dark:hover:bg-blue-gray-900/80 hover:text-accent'
                )
              }
            >
              <Icon icon={fire} className="w-7 h-7" />
              <span className="align-middle">Hot</span>
            </Tab>
          )}
          {!isLength0(sameTagArticles) && (
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full p-1 flex flex-nowrap justify-center items-center space-x-2 font-medium rounded-lg transition duration-300',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-accent ring-white dark:ring-blue-gray-900 hover:bg-opacity-50',
                  selected
                    ? 'bg-white dark:bg-blue-gray-900 shadow text-accent'
                    : 'hover:bg-white/80 dark:hover:bg-blue-gray-900/80 hover:text-accent'
                )
              }
            >
              <Icon icon={tag} className="w-7 h-7" />
              <span className="align-middle">Tag</span>
              <span className="-space-x-4 flex">
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
            </Tab>
          )}
        </Tab.List>
        <Tab.Panels className="mt-2 bg-gray-100 dark:bg-blue-gray-800 rounded-xl md:hover:scale-95 transform transition-transform duration-300">
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
          >
            <ul className="space-y-2">
              {recentArticles.map((articleHeadlineProps) => {
                return (
                  <li key={articleHeadlineProps.to}>
                    <ArticleHeadline {...articleHeadlineProps} />
                  </li>
                )
              })}
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
          >
            <ul className="space-y-2">
              {hotArticles.map((articleHeadlineProps, i) => {
                return (
                  <li key={articleHeadlineProps.to}>
                    <ArticleHeadline no={i + 1} {...articleHeadlineProps} />
                  </li>
                )
              })}
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
          >
            <ul className="space-y-2">
              {sameTagArticles.map((articleHeadlineProps) => {
                return (
                  <li key={articleHeadlineProps.to}>
                    <ArticleHeadline {...articleHeadlineProps} />
                  </li>
                )
              })}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export default RelatedArticle
