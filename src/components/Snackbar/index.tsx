import React, { FC } from 'react'

import Snackbar from '@/components/Snackbar/Snackbar'
import { useNotice } from '@/hooks/notice'

const Index: FC = () => {
  const [props] = useNotice()

  return (
    <Snackbar
      className="fixed bottom-0 left-0 md:bottom-4 md:left-4 w-full md:w-auto"
      {...props}
    />
  )
}

export default Index
