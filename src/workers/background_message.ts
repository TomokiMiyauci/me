import { messaging } from '@/workers/firebase_init'
import { onBackgroundMessage } from 'firebase/messaging/sw'
import { isUndefined } from '@miyauci/is-valid'
import { includes } from 'core-fn'
import { detect } from 'detect-browser'
import type { Locale } from '@/../config/types'
const NOT_SUPPORT = 'This browser is not support Push API'

self.addEventListener('notificationclick', (event) => {
  const _event = event as NotificationEvent
  const _clients = self.clients as Clients

  _event.notification.close()
  _event.waitUntil(
    _clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === _event.notification.data.url
            ? (windowClient.focus(), true)
            : false
        )

        if (!hadWindowToFocus)
          _clients
            .openWindow(_event.notification.data.url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            )
      })
  )
})

const main = async () => {
  const detected = detect()

  if (!detected || includes(detected.name, ['safari', 'ios'])) {
    console.warn(NOT_SUPPORT)
    return
  }

  onBackgroundMessage(messaging, async (payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    )

    const { title, body, image } = payload.notification ?? {}
    const { url, locale } =
      (payload.data as Partial<{ locale: Locale; url: string }>) ?? {}

    if (isUndefined(title) || isUndefined(body) || isUndefined(url)) {
      return
    }

    const _self = self as unknown as ServiceWorkerGlobalScope

    await _self.registration
      .showNotification(title, {
        body,
        icon: image,
        data: {
          url
        },
        lang: locale
      })
      .catch(console.error)
  })
}

export { main }
