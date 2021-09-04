import { initializeApp } from 'firebase/app'
import { initializePerformance } from 'firebase/performance'
import { initializeAnalytics, isSupported } from 'firebase/analytics'
import {
  initializeFirestore,
  connectFirestoreEmulator,
  Firestore
} from 'firebase/firestore/lite'
import {
  getMessaging,
  onMessage,
  Messaging,
  isSupported as isSupportedMessaging
} from 'firebase/messaging'
import { firebaseOptions } from '@/../config/constants'

import type { FirebaseState } from '@/types/firebase'
import { isProd } from '@/utils/environment'

const initializeFirebase = async (): Promise<FirebaseState> => {
  console.log('Initialize firebase')
  const app = initializeApp(firebaseOptions)
  const firestore = initializeFirestore(app, {})

  const isSupportedMsg = await isSupportedMessaging()
  const messaging = isSupportedMsg ? getMessaging(app) : undefined

  const result = await isSupported()
  const analytics = result ? initializeAnalytics(app) : undefined

  if (messaging) {
    onMessage(messaging, (payload) => {
      console.log(payload)
    })
  }

  if (!isProd) {
    connectFirestoreEmulator(firestore, 'localhost', 8080)
  }

  if (isProd) {
    initializePerformance(app)
  }

  return {
    app,
    firestore,
    messaging,
    analytics
  }
}

const requestFcmToken = async (
  messaging: Messaging,
  sw: ServiceWorkerRegistration
): Promise<string | void> => {
  const { getToken } = await import('firebase/messaging')

  return getToken(messaging, {
    serviceWorkerRegistration: sw
  }).catch(console.error)
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

export { initializeFirebase, requestFcmToken, postFCMToken }
