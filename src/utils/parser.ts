import { exec } from 'core-fn'

const pathParse = exec(/.*\/posts\/(.+)\/$/)

const getArticlePathName = (path: string) => {
  return pathParse(path)?.[1] ?? ''
}

const REPO = 'https://github.com/TomokiMiyauci/me/tree/main/posts/'

const makeRepoPostPath = (path: string, lang: 'en' | 'ja'): string => {
  const fileName = lang === 'en' ? 'index.mdx' : 'index.ja.mdx'

  const url = new URL(`${getArticlePathName(path)}/${fileName}`, REPO)
  return url.toString()
}

export { makeRepoPostPath }
