import IconTextLink from '@/components/IconTextLink'
import { memo, useMemo } from 'react'
import { test } from 'core-fn'
import { Navi } from './constants'
import { classNames } from '@/utils/class_name'
import type { FC } from 'react'

const endsWithPosts = test(/\/posts\/.*$/)

const Inner: FC<{ navigations: Navi[]; currentPath: string }> = ({
  navigations,
  currentPath
}) => {
  const isActive = (path: string): boolean =>
    useMemo(
      () =>
        currentPath === path ||
        (endsWithPosts(path) && endsWithPosts(currentPath)),
      [currentPath]
    )

  return (
    <ul className="flex text-gray-500 dark:text-gray-400 justify-around items-center">
      {navigations.map(({ title, to, icon, className }) => {
        return (
          <li key={to} className={classNames('w-full', className)}>
            <IconTextLink
              to={to}
              icon={icon}
              title={title}
              isActive={isActive(to)}
            />
          </li>
        )
      })}
    </ul>
  )
}

const MemoInner = memo(Inner)

const Navigation: FC<{
  className?: string
  navigations: Navi[]
  currentPath: string
}> = ({ navigations, currentPath, className }) => {
  return (
    <nav className={classNames('px-2', className)}>
      <MemoInner currentPath={currentPath} navigations={navigations} />
    </nav>
  )
}

export default Navigation
