import React, { FC, useEffect, useState } from 'react'
import IconWithLoading from './IconWithLoading'

const CommentCounter: FC<{ value: number; loading: boolean }> = ({
  value,
  loading
}) => {
  return (
    <IconWithLoading loading={loading}>
      <span
        className="text-xl underline md:no-underline hover:underline"
        style={{ textDecorationColor: 'var(--accent-color)' }}
      >
        {value}
      </span>
    </IconWithLoading>
  )
}

export default CommentCounter
