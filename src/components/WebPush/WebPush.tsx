import { useMemo } from 'react'
import { definePromise } from '@/utils/component'
import LangToggle from '@/components/LangToggle'
import cancel from '@iconify-icons/mdi/cancel'
import { Icon } from '@iconify/react/dist/offline'
import { useSequence } from '@/hooks/state'
import { useIsSupported } from '@/components/WebPush/hooks'
import { useToggleLang } from '@/components/LangToggle/hooks'
import { classNames } from '@/utils/class_name'

import type { MouseEventHandler } from 'react'
import type { Locale } from 'config/types'

const WebPush = definePromise<{
  onSubscribe: (locale: Locale) => Promise<unknown>
  onUnsubscribe: () => Promise<unknown>
  isLoggedIn: boolean
  locale: Locale
  hasSubscribed: boolean
}>(
  ({
    onSubscribe,
    onUnsubscribe,
    isLoggedIn,
    locale,
    hasSubscribed,
    className,
    onSuccess,
    onError
  }) => {
    const [isPendingSequence, sequence] = useSequence()
    const { isPending: isPendingSupported, isRejected } = useIsSupported()
    const [lang, enabled, setEnabled] = useToggleLang(locale)

    const handleClickSubscribe: MouseEventHandler = () => {
      sequence(() => onSubscribe(lang).then(onSuccess).catch(onError))
    }

    const handleClickUnSubscribe: MouseEventHandler = () => {
      sequence(() => onUnsubscribe().then(onSuccess).catch(onError))
    }

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

    return (
      <div
        className={classNames(
          'px-4 py-6 -mx-4 heropattern-architect-gray-200 dark:heropattern-architect-blue-gray-700',
          className
        )}
      >
        <h2 className="text-accent text-center text-5xl">
          Receive push notifications
        </h2>
        <p className="my-2 text-lg text-center">
          Send push notifications to the browser. You need to give permission to
          the browser to be notified.
        </p>

        <form
          onSubmit={(ev) => ev.preventDefault()}
          className="max-w-xl mt-8 mx-auto"
        >
          <h4 className="text-lg">Prefer language</h4>
          <p className="text-gray-500">
            Select language from push notification
          </p>

          <div className="text-center my-6">
            <label className="cursor-pointer">
              <LangToggle enabled={enabled} setEnabled={setEnabled} />
            </label>
          </div>

          {hasSubscribed ? (
            <button
              onClick={handleClickUnSubscribe}
              disabled={isPendingSequence}
              className="bg-red-500 w-full text-xl font-bold mt-4 mb-2 p-3 uppercase rounded-md disabled:opacity-70 active:opacity-90 focus:ring ring-gray-400 dark:ring-white transition duration-300 disabled:cursor-not-allowed"
            >
              {placeholderUnsubscribe}
            </button>
          ) : (
            <button
              disabled={isPending || isRejected}
              onClick={handleClickSubscribe}
              className="bg-accent w-full text-xl font-bold mt-4 mb-2 p-3 uppercase rounded-md disabled:opacity-70 active:opacity-90 focus:ring ring-gray-400 dark:ring-white transition duration-300 disabled:cursor-not-allowed"
            >
              {placeholder}
            </button>
          )}

          <p className="text-gray-400 text-center">
            Due to the implementation status of the browser, Safari and iOS
            safari cannot be available.
          </p>
        </form>
      </div>
    )
  }
)

export default WebPush
