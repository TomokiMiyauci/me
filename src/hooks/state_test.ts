/**
 * @jest-environment jsdom
 */

import { useSequence } from '@/hooks/state'
import { renderHook, act } from '@testing-library/react-hooks'
import { wait } from '@/utils/time'

describe('useSequence', () => {
  const table: [boolean | (() => boolean), boolean][] = [
    [false, false],
    [true, true],
    [() => false, false],
    [() => true, true]
  ]
  it.each(table)('should set initial value', (init, expected) => {
    const { result } = renderHook(() => useSequence(init))
    expect(result.current[0]).toBe(expected)
  })

  it('should not call when the state is true', () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useSequence(true))

    act(() => {
      result.current[1](fn)
    })

    expect(result.current[0]).toBeTruthy()
    expect(fn).not.toBeCalled()
  })

  it('should call when the state is false and pass sync fn', async () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useSequence())

    expect(result.current[0]).toBeFalsy()

    await act(async () => {
      await result.current[1](fn)
    })

    expect(fn).toBeCalled()
    expect(result.current[0]).toBeFalsy()
  })

  it('should call when the state is false and pass async fn', async () => {
    const fn = jest.fn(async () => {
      await wait(200)
    })
    const fn2 = jest.fn()
    const { result } = renderHook(() => useSequence())
    expect(result.current[0]).toBeFalsy()

    act(() => {
      result.current[1](fn)
    })
    expect(fn).toBeCalled()
    expect(result.current[0]).toBeTruthy()

    act(() => {
      result.current[1](fn2)
    })
    expect(result.current[0]).toBeTruthy()
    expect(fn2).not.toBeCalled()
  })
})
