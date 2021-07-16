import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { FirebaseFirestore } from 'firebase/firestore/lite'

type FirebaseState = Partial<{
  app: FirebaseApp
  firestore: FirebaseFirestore
  auth: Auth
}>

export type { FirebaseState }
