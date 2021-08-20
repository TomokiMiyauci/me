import { switchable } from '@/util'

describe('switchable', () => {
  it('should return development when process.env.NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development'
    expect(process.env.NODE_ENV).toBe('development')

    const development = jest.fn()
    const production = jest.fn()

    const fn = switchable(production, development)

    expect(fn).toEqual(development)
    fn()
    expect(development).toHaveBeenCalled()
    expect(production).not.toHaveBeenCalled()
  })

  it('should return development when process.env.NODE_ENV is not production', () => {
    process.env.NODE_ENV = 'not production'
    expect(process.env.NODE_ENV).toBe('not production')

    const development = jest.fn()
    const production = jest.fn()

    const fn = switchable(production, development)

    expect(fn).toEqual(development)
    fn()
    expect(development).toHaveBeenCalled()
    expect(production).not.toHaveBeenCalled()
  })

  it('should return production when process.env.NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production'
    expect(process.env.NODE_ENV).toBe('production')

    const development = jest.fn()
    const production = jest.fn()

    const fn = switchable(production, development)
    expect(fn).toEqual(production)
    fn()
    expect(production).toHaveBeenCalled()
    expect(development).not.toHaveBeenCalled()
  })
})
