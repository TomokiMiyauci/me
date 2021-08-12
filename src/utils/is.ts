const isUndefined = (val: unknown): val is undefined =>
  typeof val === 'undefined'

const isString = (val: unknown): val is string => typeof val === 'string'

const isLength0 = (val: unknown): boolean =>
  Array.isArray(val) || isString(val) ? val.length === 0 : false

const isEmpty = isLength0

export { isUndefined, isString, isLength0, isEmpty }
