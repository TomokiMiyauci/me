import WebPush from '@/components/WebPush/WebPush'
import TestWebPush from '@/components/WebPush/TestWebPush'
import { useFirestoreLite } from '@/hooks/firebase/firestore_lite'
import { useMessaging } from '@/hooks/firebase/messaging'
import { useNotice } from '@/hooks/notice'
import { useUnsubscribe } from '@/components/WebPush/hooks'
import { useAuth } from '@/hooks/auth'
import { useLocalization } from 'gatsby-theme-i18n'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'
import { defineComponent } from '@/utils/component'

import type { Locale } from 'config/types'

const NOT_GRANTED =
  'The notification permission was not granted. Please check browser settings'

const Index = defineComponent(({ className }) => {
  const firestore = useFirestoreLite()
  const messaging = useMessaging()
  const notice = useNotice()
  const [{ uid, isLoggedIn }] = useAuth()
  const [hasSubscribed, changeHasSubscribed] = useUnsubscribe()
  const { locale } = useLocalization()
  const { safeLogEvent } = useSafeLogEvent()

  const handleSubscribe = async (locale: Locale): Promise<void> => {
    if (!messaging || !firestore) {
      return
    }
    const { requestFcmToken, postFCMToken } = await import('@/utils/firebase')
    const { getServiceWorker } = await import('@/utils/service_worker')
    const sw = await getServiceWorker('/sw.js')

    if (!sw) {
      return
    }

    const token = await requestFcmToken(messaging, sw)
    if (!token) {
      notice({
        type: 'alert',
        field: <div>{NOT_GRANTED}</div>
      })
      return
    }

    const result = await postFCMToken(
      firestore,
      {
        token,
        topics: ['article', locale]
      },
      uid!
    )
    await changeHasSubscribed()

    if (result) {
      notice({
        type: 'success',
        field: <div>Success subscription Web Push</div>
      })
      safeLogEvent((analytics, logEvent) => {
        logEvent(analytics, 'subscription', {
          type: 'webpush'
        })
      })
    } else {
      notice({
        type: 'alert',
        field: <span>Already subscribed</span>
      })
    }
  }

  const handleUnsubscribe = async () => {
    if (!messaging) return
    const { collection, getDocs, deleteDoc } = await import(
      'firebase/firestore/lite'
    )

    const { requestFcmToken } = await import('@/utils/firebase')
    const { getServiceWorker } = await import('@/utils/service_worker')
    const sw = await getServiceWorker('/sw.js')

    if (!sw) {
      return
    }

    const { deleteToken } = await import('firebase/messaging')
    const col = collection(firestore!, 'users', uid!, 'fcm')
    const { docs } = await getDocs(col)

    await requestFcmToken(messaging, sw)

    await Promise.all(
      Array.from(docs).map(async (doc) => {
        await deleteDoc(doc.ref)
      })
    )

    await deleteToken(messaging)
    notice({
      type: 'success',
      field: <div>Unsubscribed push message</div>
    })
    safeLogEvent((analytics, logEvent) => {
      logEvent(analytics, 'unsubscription', {
        type: 'webpush'
      })
    })
    changeHasSubscribed()
  }

  const handleError = ({ name, message }: Error) => {
    notice({
      type: 'alert',
      field: <div>Something went wrong. This error has reported.</div>
    })

    safeLogEvent((analytics, logEvent) => {
      logEvent(analytics, 'exception', {
        description: message,
        name
      })
    })
  }

  return (
    <WebPush
      className={className}
      isLoggedIn={isLoggedIn}
      locale={locale as Locale}
      hasSubscribed={hasSubscribed}
      onSubscribe={handleSubscribe}
      onUnsubscribe={handleUnsubscribe}
      onSuccess={() => {}}
      onError={handleError}
      Test={
        <TestWebPush
          className="mb-8"
          onForeground={() => {
            safeLogEvent((analytics, logEvent) =>
              logEvent(analytics, 'select_content', {
                content_type: 'foreground_message',
                test: true
              })
            )
            const url = window.location.href
            notice({
              icon: <img className="w-12 h-12" src="/logo_square.png" />,
              className:
                'bg-gradient-to-r text-white from-purple-500 shadow via-pink-500 to-amber-500 border-t dark:border-blue-gray-700 border-gray-100 md:border-none',
              field: (
                <div>
                  <div className="font-bold">Hello Test</div>
                  <div>This is test message</div>
                  <div className="text-xs text-gray-100">{url}</div>
                </div>
              ),
              url,
              closeClassName: 'hover:bg-gray-700 hover:bg-opacity-40'
            })
          }}
          onBackground={async () => {
            safeLogEvent((analytics, logEvent) =>
              logEvent(analytics, 'select_content', {
                content_type: 'background_message',
                test: true
              })
            )
            const { getServiceWorker } = await import('@/utils/service_worker')
            const { isSupported } = await import('@/utils/notification')
            const sw = await getServiceWorker('/sw')

            if (!sw || !isSupported()) {
              return notice({
                type: 'alert',
                field: <div>This browser is not available</div>
              })
            }

            window.Notification.requestPermission((permission) => {
              switch (permission) {
                case 'granted': {
                  if ('showNotification' in sw) {
                    return sw.showNotification('Hello Test', {
                      body: 'This is test message from service worker',
                      icon: '/logo_square.png',
                      data: {
                        url: window.location.href
                      }
                    })
                  }
                }

                case 'denied': {
                  return notice({
                    type: 'alert',
                    field: <div>{NOT_GRANTED}</div>
                  })
                }
              }
            })
          }}
        />
      }
    />
  )
})

export default Index
