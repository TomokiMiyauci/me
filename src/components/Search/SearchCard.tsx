import { defineComponent } from '@/utils/component'
import { classNames } from '@/utils/class_name'
import type { ReactNode, CSSProperties } from 'react'

const SearchCard = defineComponent<{
  children: ReactNode
  style?: CSSProperties
}>(({ className, children, style }) => {
  return (
    <div
      style={style}
      className={classNames(
        'dark:border dark:border-blue-gray-700 bg-gray-50 dark:bg-blue-gray-800 flex flex-col justify-center cursor-auto rounded-xl shadow-md hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  )
})

export default SearchCard
