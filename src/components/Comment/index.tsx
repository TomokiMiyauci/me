import React, { FC, useRef, useEffect } from 'react'

const SOURCE = 'https://utteranc.es/client.js'

type CommentProps = {
  repo: string
  issueTerm: IssueTerm
  label?: string
  theme: Theme
}

type IssueTerm = 'pathname'
type Theme =
  | 'github-light'
  | 'github-dark'
  | 'preferred-color-scheme'
  | 'github-dark-orange'
  | 'icy-dark'
  | 'dark-blue'
  | 'photon-dark'
  | 'boxy-light'

const Comment: FC<CommentProps> = ({ repo, label, theme, issueTerm }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scriptEl = document.createElement('script')

    scriptEl.src = SOURCE
    scriptEl.async = true
    scriptEl.setAttribute('repo', repo)
    scriptEl.setAttribute('issue-term', issueTerm)
    scriptEl.setAttribute('crossorigin', 'anonymous')
    scriptEl.setAttribute('theme', theme)
    if (label) {
      scriptEl.setAttribute('label', label)
    }

    if (!ref.current?.hasChildNodes()) {
      ref.current?.appendChild(scriptEl)
    } else {
      const first = ref.current.firstChild
      if (first) {
        ref.current.replaceChild(scriptEl, first)
      }
    }
  }, [])

  return <div ref={ref} />
}

export default Comment
