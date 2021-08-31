import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  connectAuthEmulator,
  indexedDBLocalPersistence
} from 'firebase/auth'
import {
  initializeFirestore,
  connectFirestoreEmulator
} from 'firebase/firestore/lite'
import { getMessaging } from 'firebase/messaging/sw'
import { firebaseOptions } from '@/../config/constants'
import { isProd } from '@/utils/environment'

const app = initializeApp(firebaseOptions)
const messaging = getMessaging(app)
const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
})
const firestore = initializeFirestore(app, {})

if (!isProd) {
  connectFirestoreEmulator(firestore, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true
  })
}

export { app, messaging, auth, firestore }
