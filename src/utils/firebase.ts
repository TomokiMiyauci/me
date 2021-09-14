import type { Firestore } from 'firebase/firestore/lite'
import type { Messaging } from 'firebase/messaging'

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

export { requestFcmToken, postFCMToken }
