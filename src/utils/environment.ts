const isBrowser = typeof window !== 'undefined'

const isProd: boolean =
  process.env.NODE_ENV === 'production' && process.env.GATSBY_STAGE === 'main'
export { isBrowser, isProd }
