import { LocalizedLink } from 'gatsby-theme-i18n'
import { classNames } from '@/utils/class_name'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import Esc from '@/components/Esc'
import { useLayoutContext } from '@/layouts/hooks'
import Context from '@/components/LangSwitcher/context'
import { useContext, memo } from 'react'
import Tooltip from '@/components/Tooltip'
import Swipe from '@/components/Swipe'
import type { FC } from 'react'

const Memo = memo(Swipe)

const Index: FC = () => {
  const { originalPath, locale } = useLayoutContext()
  const [_, { off: hideDialog }] = useContext(Context)

  return (
    <>
      <Memo />
      <header className="flex justify-between items-center py-1 px-2">
        <span className="space-x-4">
          <Tooltip title="Close">
            <button
              onClick={hideDialog}
              className="btn-circle p-2 hover:text-accent transition-colors duration-300"
            >
              <IconSkeltonLoader
                icon={() => import('@iconify-icons/mdi/close')}
                className="w-8 h-8"
                fallbackClassName="rounded-full"
              />
            </button>
          </Tooltip>

          <h2 className="inline text-2xl space-x-2 align-middle">
            <IconSkeltonLoader
              icon={() => import('@iconify-icons/mdi/google-translate')}
              className="w-8 h-8"
              fallbackClassName="rounded"
            />
            <span>Translate</span>
          </h2>
        </span>
        <Esc onClick={hideDialog} onKeyDownEscape={hideDialog} />
      </header>

      <hr className="border-gray-200 dark:border-blue-gray-700" />
      <ul className="flex flex-col md:flex-row flex-1 divide-y md:divide-x divide-gray-200 dark:divide-blue-gray-700 relative">
        <Tooltip
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          title="Translate"
        >
          <LocalizedLink
            to={originalPath}
            language={locale === 'en' ? 'ja' : 'en'}
            className="bg-gray-50 dark:bg-blue-gray-800 inline-block rounded-full border border-gray-200 dark:border-blue-gray-700 hover:bg-gray-100 dark:hover:bg-blue-gray-900 transition-colors duration-300"
            onClick={hideDialog}
          >
            <IconSkeltonLoader
              icon={() => import('@iconify/icons-akar-icons/arrow-cycle')}
              className="w-10 h-10 animate-spin-bit-slow"
              fallbackClassName="rounded-full"
            />
          </LocalizedLink>
        </Tooltip>
        <li className="flex-1 hover:bg-gray-100 dark:hover:bg-blue-gray-900 transition duration-300 md:rounded-bl-xl">
          <LocalizedLink
            className={classNames(
              'text-center h-full grid place-items-center',
              locale === 'en' ? 'text-accent' : ''
            )}
            onClick={hideDialog}
            to={originalPath}
            language="en"
          >
            <span className="space-y-2">
              <IconSkeltonLoader
                icon={() => import('@iconify/icons-ant-design/global-outlined')}
                className="w-16 h-16"
                fallbackClassName="rounded-full"
              />
              <div className="text-center text-2xl font-bold">English</div>
            </span>
          </LocalizedLink>
        </li>

        <li className="flex-1 hover:bg-gray-100 dark:hover:bg-blue-gray-900 transition duration-300 rounded-b-xl md:rounded-br-xl">
          <LocalizedLink
            className={classNames(
              'space-y-2 text-center h-full grid place-items-center',
              locale === 'ja' ? 'text-accent' : ''
            )}
            onClick={hideDialog}
            to={originalPath}
            language="ja"
          >
            <span className="space-y-2">
              <IconSkeltonLoader
                icon={() => import('@iconify/icons-emojione/flag-for-japan')}
                className="w-16 h-16"
                fallbackClassName="rounded-full"
              />
              <div className="text-center text-2xl font-bold">日本語</div>
            </span>
          </LocalizedLink>
        </li>
      </ul>
    </>
  )
}

export default memo(Index)
