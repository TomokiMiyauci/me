import { readdirSync, statSync } from 'fs'
import { join, parse } from 'path'

const sourceRootDir = join('/src', 'pages')
const jaDir = join('ja', 'posts')
const enDir = join('posts')
const rootDirEn = join(__dirname, sourceRootDir, enDir)
const rootDirJa = join(__dirname, sourceRootDir, jaDir)
const filePathsEn = readdirSync(rootDirEn, {
  withFileTypes: true
})
  .filter((file) => file.isFile() && !file.name.endsWith('index.md'))
  .map((file) => ({
    fullpath: join(rootDirEn, file.name),
    path: parse(file.name).name,
    component: join(sourceRootDir, enDir, file.name)
  }))

const filePathsJa = readdirSync(rootDirJa, {
  withFileTypes: true
})
  .filter((file) => file.isFile() && !file.name.endsWith('index.md'))
  .map((file) => ({
    fullpath: join(rootDirJa, file.name),
    path: `${parse(file.name).name}`,
    component: join(sourceRootDir, jaDir, file.name)
  }))

const fileStatsEn = filePathsEn.map(({ fullpath, component, path }) => ({
  component,
  fullpath,
  path,
  stat: statSync(fullpath)
}))
const fileStatsJa = filePathsJa.map(({ fullpath, component, path }) => ({
  component,
  path,
  fullpath,
  stat: statSync(fullpath)
}))

const getStats = (locale: 'en' | 'ja') =>
  locale === 'en' ? fileStatsEn : fileStatsJa

export { getStats }
