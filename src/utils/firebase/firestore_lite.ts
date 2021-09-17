import {
  initializeFirestore as _initializeFirestore,
  connectFirestoreEmulator
} from 'firebase/firestore/lite'
import { isProd } from '@/utils/environment'
import type { Firestore } from 'firebase/firestore/lite'
import type { FirebaseApp } from 'firebase/app'

/**
 * Initializes a new instance of Firestore with the provided settings. Can only be called before any other function, including getFirestore. If the custom settings are empty, this function is equivalent to calling getFirestore.
 * @param app - The firebase/app#FirebaseApp with which the Firestore instance will be associated.
 * @returns A newly initialized Firestore instance.
 */
const initializeFirestore = (app: FirebaseApp): Firestore => {
  const firestore = _initializeFirestore(app, {})

  if (!isProd) {
    connectFirestoreEmulator(firestore, 'localhost', 8080)
  }

  return firestore
}

type FCMData = {
  token: string
  topics: ('article' | 'en' | 'ja')[]
}

const postFCMToken = async (
  firestore: Firestore,
  { token, topics }: FCMData,
  userId: string
): Promise<boolean> => {
  const { doc, setDoc, arrayUnion, serverTimestamp } = await import(
    'firebase/firestore/lite'
  )

  const _doc = doc(firestore, 'users', userId, 'fcm', token)
  return setDoc(_doc, {
    token,
    topics: arrayUnion(...topics),
    createdAt: serverTimestamp()
  })
    .then(() => true)
    .catch((e) => {
      console.error(e)
      return false
    })
}

export { initializeFirestore, postFCMToken }
