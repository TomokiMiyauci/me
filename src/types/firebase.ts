import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore/lite'

type FirebaseState = Partial<{
  app: FirebaseApp
  firestore: Firestore
  auth: Auth
}>

export type { FirebaseState }
