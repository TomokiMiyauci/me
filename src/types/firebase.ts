import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore/lite'
import type { Messaging } from 'firebase/messaging'
import type { Analytics } from 'firebase/analytics'

type FirebaseState = Partial<{
  app: FirebaseApp
  firestore: Firestore
  auth: Auth
  messaging: Messaging
  analytics: Analytics
  hasInitialized: boolean
}>

export type { FirebaseState }
