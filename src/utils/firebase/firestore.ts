import {
  initializeFirestore,
  connectFirestoreEmulator
} from 'firebase/firestore'
import { isProd } from '@/utils/environment'
import type { Firestore } from 'firebase/firestore'
import type { FirebaseApp } from 'firebase/app'

/**
 * Initializes a new instance of Firestore with the provided settings. Can only be called before any other function, including getFirestore. If the custom settings are empty, this function is equivalent to calling getFirestore.
 * @param app - The firebase/app#FirebaseApp with which the Firestore instance will be associated.
 * @returns A newly initialized Firestore instance.
 */
const initialize = (app: FirebaseApp): Firestore => {
  const firestore = initializeFirestore(app, {})
  console.log(app, 'init', initializeFirestore)

  if (!isProd) {
    connectFirestoreEmulator(firestore, 'localhost', 8080)
  }

  return firestore
}

export { initialize }
