import { messaging } from '@/workers/util/firebase_init'
import { isSupported } from 'firebase/messaging/sw'
import { onBackgroundMessage } from 'firebase/messaging/sw'
import { isUndefined } from '@miyauci/is-valid'
import type { Locale } from '@/../config/types'
const NOT_SUPPORT = 'This browser is not support Push API'

const subscribeBackgroundMessage = async () => {
  const supported = await isSupported()

  if (!supported) {
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

export { subscribeBackgroundMessage }
