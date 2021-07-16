import { createContext, Dispatch, SetStateAction } from 'react'
import type { FirebaseState } from '../types/firebase'

const FirebaseContext = createContext<
  [FirebaseState, Dispatch<SetStateAction<FirebaseState>>]
>([{}, () => {}])

export default FirebaseContext
