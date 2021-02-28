const url2PublicId = (url: string): string =>
  url.replace(/^http.*\/upload\/.*(?:v\d+\/)/, '')

export { url2PublicId }
