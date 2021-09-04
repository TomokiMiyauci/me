const wait = (milliseconds: number): Promise<NodeJS.Timeout> =>
  new Promise<NodeJS.Timeout>((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(timeoutId)
    }, milliseconds)
  })

export { wait }
