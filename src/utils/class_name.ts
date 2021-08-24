const classNames = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(' ')

export { classNames }
