import React, { FC, useContext } from 'react'

import Snackbar from './Snackbar'
import Context from './Context'

const Index: FC = () => {
  const [props] = useContext(Context)

  return (
    <Snackbar
      className="fixed bottom-0 left-0 md:bottom-4 md:left-4 w-full md:w-auto"
      {...props}
    />
  )
}

export default Index
