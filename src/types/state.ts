import type { Dispatch, SetStateAction } from 'react'

type StateSet<T> = [T, Dispatch<SetStateAction<T>>]

export type { StateSet }
