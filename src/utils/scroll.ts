import { optimizer } from './optimizer'

interface ScrollInfo {
  direction: 'up' | 'down'
  diff: number
}
let lastPosition = 0

const scrollInfoEvent = (fn: (ev: Event & ScrollInfo) => unknown) => {
  return (ev: Event) => {
    return optimizer(() => {
      const _lastPosition = lastPosition
      const currentScrollY = scrollY
      lastPosition = scrollY

      const calc = currentScrollY - _lastPosition
      fn({
        ...ev,
        ...{
          direction: calc > 0 ? 'down' : 'up',
          diff: Math.abs(calc)
        }
      })
    })(ev)
  }
}

export { scrollInfoEvent }
