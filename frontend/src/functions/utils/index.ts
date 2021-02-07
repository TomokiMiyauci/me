import { curry } from '@kahirokunn/ts-curry'
const startWith = (searchString: string, val: string): boolean =>
  val.startsWith(searchString)

const endsWith = (searchString: string, val: string): boolean =>
  val.endsWith(searchString)
const curriedStartWith = curry(startWith)
const curriedEndsWith = curry(endsWith)
const isStartWithSlash = curriedStartWith('/')
const isEndsWithSlash = curriedEndsWith('/')
const isStartWithSlashJa = curriedStartWith('/ja')
const isStartWithSlashJaSlash = curriedStartWith('/ja/')
const isStartWithSlashJaSlashPosts = curriedStartWith('/ja')

export {
  isEndsWithSlash,
  isStartWithSlash,
  isStartWithSlashJa,
  isStartWithSlashJaSlash,
  isStartWithSlashJaSlashPosts,
  startWith
}
