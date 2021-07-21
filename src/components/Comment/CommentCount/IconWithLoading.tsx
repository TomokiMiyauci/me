import React, { FC, CSSProperties } from 'react'
import commentEditOutline from '@iconify-icons/mdi/comment-edit-outline'
import { Icon } from '@iconify/react/dist/offline'
import Placeholder from '../../Placeholder'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
const IconWithLoading: FC<{
  loading: boolean
  className?: string
  style?: CSSProperties
}> = ({ loading, children, className, style }) => {
  return (
    <div className={`flex space-x-2 items-center ${className}`} style={style}>
      <Icon
        className="w-6 h-6 md:w-7 md:h-7 text-accent"
        icon={commentEditOutline}
      />
      <Placeholder
        placeholding={!loading}
        placeholder={
          <Loader
            type="Circles"
            color="var(--accent-color)"
            height={20}
            width={20}
          />
        }
      >
        {children}
      </Placeholder>
    </div>
  )
}

export default IconWithLoading
