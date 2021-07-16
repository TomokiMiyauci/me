import React, { FC, useMemo } from 'react'
import { Utterances, Theme } from 'utterances-react-component'
import { useDarkMode } from '../../hooks/dark_mode'

const Comment: FC = () => {
  const { value } = useDarkMode()
  const theme = useMemo(
    () => (value ? 'icy-dark' : 'github-light') as Theme,
    [value]
  )

  return (
    <Utterances
      repo="TomokiMiyauci/me"
      issueTerm="pathname"
      label="comment"
      theme={theme}
    />
  )
}

export default Comment
