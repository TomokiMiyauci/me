import React, { FC, ReactChild } from 'react'

const Alert: FC<{ children: ReactChild }> = ({ children }) => {
  return (
    <div className="dark:bg-gray-800 rounded-md px-3 py-1 light:bg-gray-200">
      {children}
    </div>
  )
}

export default Alert
