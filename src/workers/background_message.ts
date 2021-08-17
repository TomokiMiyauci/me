import { messaging } from '@/workers/firebase_init'
import { onBackgroundMessage } from 'firebase/messaging/sw'
import { isUndefined } from '@miyauci/is-valid'
import { includes } from 'core-fn'
import { detect } from 'detect-browser'
const NOT_SUPPORT = 'This browser is not support Push API'

const main = async () => {
  const detected = detect()

  if (!detected || includes(detected.name, ['safari', 'ios'])) {
    console.warn(NOT_SUPPORT)
    return
  }

  onBackgroundMessage(messaging, (payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    )

    const { title, body, image } = payload.notification ?? {}

    if (isUndefined(title) || isUndefined(body)) {
      return
    }

    const _self = self as unknown as ServiceWorkerGlobalScope

    _self.registration.showNotification(title, {
      body,
      icon: image
    })
  })
}

export { main }
