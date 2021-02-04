import { curry } from '@kahirokunn/ts-curry'
const startWith = (searchString: string, val: string): boolean =>
  val.startsWith(searchString)

const curriedStartWith = curry(startWith)
const isStartWithSlash = curriedStartWith('/')
const isStartWithSlashJa = curriedStartWith('/ja')
const isStartWithSlashJaSlash = curriedStartWith('/ja/')
const isStartWithSlashJaSlashPosts = curriedStartWith('/ja')

export {
  isStartWithSlash,
  isStartWithSlashJa,
  isStartWithSlashJaSlash,
  isStartWithSlashJaSlashPosts,
  startWith
}
