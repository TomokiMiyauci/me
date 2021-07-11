import React, { FC, useContext, useMemo } from 'react'
import { Utterances, Theme } from 'utterances-react-component'
import DarkModeContext from '../DarkMode/Context'

const Comment: FC = () => {
  const [isDark] = useContext(DarkModeContext)
  const theme = useMemo(
    () => (isDark ? 'icy-dark' : 'github-light') as Theme,
    [isDark]
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
