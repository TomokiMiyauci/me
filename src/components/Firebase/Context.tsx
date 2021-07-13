import { createContext } from 'react'
import type { FirebaseApp } from 'firebase/app'
import type { FirebaseFirestore } from 'firebase/firestore/lite'

type FirebaseState = Partial<{
  app: FirebaseApp
  firestore: FirebaseFirestore
}>

const FirebaseContext = createContext<FirebaseState>({})

export default FirebaseContext
export type { FirebaseState }
