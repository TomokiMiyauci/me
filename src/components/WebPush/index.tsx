import React, { FC, MouseEventHandler, useMemo } from 'react'
import { useFirebase } from '@/hooks/firebase'
import LangToggle from '@/components/LangToggle'
import { useToggleLang } from '@/components/LangToggle/hooks'
import { useSequence } from '@/hooks/state'
import { useNotice } from '@/hooks/notice'
import cancel from '@iconify-icons/mdi/cancel'
import { useUnsubscribe, useIsSupported } from '@/components/WebPush/hooks'
import { Icon } from '@iconify/react/dist/offline'
import { useAuth } from '@/hooks/auth'

const WebPush: FC = () => {
  const { isPending: isPendingSupported, isRejected } = useIsSupported()
  const [{ messaging, firestore }] = useFirebase()
  const [isPendingSequence, sequence] = useSequence()
  const [_, notice] = useNotice()
  const [{ uid, isLoggedIn }] = useAuth()
  const [hasSubscribed, changeHasSubscribed] = useUnsubscribe()

  const isPending = useMemo<boolean>(
    () => isPendingSupported || isPendingSequence || !isLoggedIn,
    [isPendingSupported, isPendingSequence, isLoggedIn]
  )

  const placeholder = useMemo(() => {
    if (isPending) return '...Loading'
    if (isRejected) return <Icon className="w-6 h-6" icon={cancel} />

    return 'Subscribe'
  }, [isPending, isRejected])

  const placeholderUnsubscribe = useMemo<string>(() => {
    if (isPendingSequence) return '...Loading'

    return 'unsubscribe'
  }, [isPendingSequence])

  const [locale, enabled, setEnabled] = useToggleLang()

  const handleClick: MouseEventHandler = async (): Promise<void> => {
    if (!messaging || !firestore) {
      return
    }
    const { requestFcmToken, getServiceWorker, postFCMToken } = await import(
      '@/utils/firebase'
    )
    const sw = await getServiceWorker('/sw.js')
    if (!sw) {
      return
    }

    const token = await requestFcmToken(messaging, sw)
    if (!token) {
      notice({
        type: 'alert',
        field: (
          <>
            <div>The notification permission was not granted.</div>
            <div>Please check browser settings</div>
          </>
        )
      })
      return
    }

    const result = await postFCMToken(
      firestore,
      {
        token,
        topics: ['article', locale]
      },
      uid
    )
    await changeHasSubscribed()

    if (result) {
      notice({
        type: 'success',
        field: <div>Success subscription Web Push</div>
      })
    } else {
      notice({
        type: 'alert',
        field: <span>Already subscribed</span>
      })
    }
  }

  const handleUnsubscribe: MouseEventHandler = async () => {
    const { collection, getDocs, deleteDoc } = await import(
      'firebase/firestore/lite'
    )
    const { deleteToken } = await import('firebase/messaging')
    const col = collection(firestore!, 'users', uid, 'fcm')
    const { docs } = await getDocs(col)

    await Promise.all(
      Array.from(docs).map(async (doc) => {
        await deleteDoc(doc.ref)
      })
    )
    await deleteToken(messaging!)
    notice({
      type: 'success',
      field: <div>Unsubscribed from push message</div>
    })
    changeHasSubscribed()
  }
  return (
    <div className="px-4 py-6 -mx-4 heropattern-architect-gray-200 dark:heropattern-architect-blue-gray-700">
      <h2 className="text-accent text-center text-5xl">
        Receive push notifications
      </h2>
      <p className="my-2 text-lg text-center">
        Send push notifications to the browser. You need to give permission to
        the browser to be notified.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-xl mt-8 mx-auto"
      >
        <h4 className="text-lg">Prefer language</h4>
        <p className="text-gray-500">Select language from push notification</p>

        <div className="text-center my-6">
          <label className="cursor-pointer">
            <LangToggle enabled={enabled} setEnabled={setEnabled} />
          </label>
        </div>

        {hasSubscribed ? (
          <button
            onClick={() => sequence(handleUnsubscribe)}
            disabled={isPendingSequence}
            className="bg-red-500 w-full text-xl font-bold mt-4 mb-2 p-3 uppercase rounded-md disabled:opacity-70 active:opacity-90 focus:ring ring-gray-400 dark:ring-white transition duration-300 disabled:cursor-not-allowed"
          >
            {placeholderUnsubscribe}
          </button>
        ) : (
          <button
            disabled={isPending || isRejected}
            onClick={() => sequence(handleClick)}
            className="bg-accent w-full text-xl font-bold mt-4 mb-2 p-3 uppercase rounded-md disabled:opacity-70 active:opacity-90 focus:ring ring-gray-400 dark:ring-white transition duration-300 disabled:cursor-not-allowed"
          >
            {placeholder}
          </button>
        )}

        <p className="text-gray-400 text-center">
          Due to the implementation status of the browser, Safari and iOS safari
          cannot be available.
        </p>
      </form>
    </div>
  )
}

export default WebPush
