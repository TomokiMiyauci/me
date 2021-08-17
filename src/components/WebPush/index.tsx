import React, { FC, useEffect, useState, MouseEventHandler } from 'react'
import { useFirebase } from '@/hooks/firebase'

import LangToggle from '@/components/LangToggle'
import { useToggleLang } from '@/components/LangToggle/hooks'

const useDisabled = () => {
  const [state, changeState] = useState(true)

  useEffect(() => {
    import('firebase/messaging').then(async ({ isSupported }) => {
      const result = await isSupported()
      if (result) {
        changeState(false)
      }
    })
  }, [])

  return [state, changeState] as const
}

const WebPush: FC = () => {
  const [disabled] = useDisabled()
  const [{ messaging, firestore }] = useFirebase()

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
      return
    }

    const result = await postFCMToken(firestore, {
      token,
      topics: ['article', locale]
    })

    if (result) {
      console.log('success')
    } else {
      console.log('error')
    }
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

        <button
          disabled={disabled}
          onClick={handleClick}
          className="bg-accent w-full text-xl font-bold mt-4 mb-2 p-3 uppercase rounded-md disabled:opacity-70 active:opacity-90 focus:ring ring-gray-400 dark:ring-white transition duration-300 disabled:cursor-not-allowed"
        >
          Subscribe
        </button>

        <p className="text-gray-400 text-center">
          Due to the implementation status of the browser, Safari and iOS safari
          cannot be available.
        </p>
      </form>
    </div>
  )
}

export default WebPush
