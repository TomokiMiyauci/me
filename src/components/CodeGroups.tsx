import React, { FC, ReactNode, useState } from 'react'
import { isArray } from '@miyauci/is-valid'
const CodeGroup: FC<{
  children: ReactNode & {
    props: {
      label: string
    }
  }
}> = ({ children }) => {
  const [state, changeState] = useState(0)

  const _children = isArray(children) ? children : [children]
  const filtered = _children.filter((_, index) => index === state)
  const labels = _children.map((child) => child.props.label)

  return (
    <div className="relative -space-y-4">
      <div className="text-right">
        <span
          style={{ backgroundColor: 'rgb(40, 44, 52)' }}
          className="text-gray-200 inline-block rounded md:rounded-md"
        >
          {labels.map((label, i) => (
            <button
              title={label}
              className={
                state === i
                  ? ' text-cyan-500 py-1 px-2 capitalize'
                  : 'py-1 px-2 capitalize'
              }
              onClick={() => changeState(i)}
              key={label}
            >
              {label}
            </button>
          ))}
        </span>
      </div>

      {filtered}
    </div>
  )
}

export default CodeGroup
