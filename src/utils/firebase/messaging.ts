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

export { requestFcmToken }
