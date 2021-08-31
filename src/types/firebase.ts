import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore/lite'
import type { Messaging } from 'firebase/messaging'

type FirebaseState = Partial<{
  app: FirebaseApp
  firestore: Firestore
  auth: Auth
  messaging: Messaging
  uid: string | undefined
  isLoggedIn: boolean
  isInitialized: boolean
  isReady: boolean
}>

export type { FirebaseState }
