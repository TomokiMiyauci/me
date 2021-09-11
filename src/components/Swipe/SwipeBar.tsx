import { defineComponent } from '@/utils/component'
import { classNames } from '@/utils/class_name'
import { memo } from 'react'
const SwipeBar = defineComponent(({ className }) => {
  return (
    <span
      className={classNames(
        'h-1.5 inline-block rounded-full bg-gray-400 bg-opacity-50',
        className
      )}
    />
  )
})

export default memo(SwipeBar)
