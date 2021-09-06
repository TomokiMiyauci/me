import { useState, useMemo } from 'react'
import emailIcon from '@iconify-icons/mdi/email'
import { Icon } from '@iconify/react/dist/offline'
import { useAsyncMemo } from 'use-async-memo'
import { useSequence } from '@/hooks/state'
import LangToggle from '@/components/LangToggle'
import { useToggleLang } from '@/components/LangToggle/hooks'
import { definePromise } from '@/utils/component'
import type { HTTPError } from 'ky'
import type {
  MouseEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactElement
} from 'react'
import type { Locale } from 'config/types'

type ClickEventHandler = (email: string, locale: Locale) => Promise<Response>

const Newsletter = definePromise<{
  pending?: boolean
  locale: Locale
  PrivacyPolicy?: ReactElement
  onClick: ClickEventHandler
  onError: (e: HTTPError) => void
}>(
  ({
    pending,
    onError,
    onSuccess,
    onClick,
    className,
    locale,
    PrivacyPolicy
  }) => {
    const [email, changeEmail] = useState('')
    const [isLoading, sequence] = useSequence()
    const [lang, enabled, setEnabled] = useToggleLang(locale)

    const handleClick: MouseEventHandler = () => emitEvent()
    const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) =>
      changeEmail(ev.target.value)
    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (ev) => {
      if (ev.key == 'Enter') {
        ev.preventDefault()
        emitEvent()
      }
    }

    const emitEvent = (): void => {
      if (!isValid) return

      sequence(async () => {
        await onClick(email, lang)
          .then(onSuccess)
          .then(() => changeEmail(''))
          .catch(onError)
      })
    }

    const isValid = useAsyncMemo(async () => {
      if (!email) return false
      const { default: isEmail } = await import('is-email')
      return isEmail(email) as boolean
    }, [email])

    const disabled = useMemo<boolean>(
      () => pending ?? (!isValid || isLoading),
      [pending, isValid]
    )
    return (
      <div
        className={`px-4 py-6 -mx-4 heropattern-bubbles-gray-200 dark:heropattern-bubbles-gray-700 ${className}`}
      >
        <h2 className="text-5xl p-4 mb-4 text-accent text-center">
          Join my Newsletter
        </h2>

        <p className="text-center text-xl">
          If you've found any of my articles useful, subscribe to be notified of
          more quality articles as soon as they're published.
        </p>

        <form
          className="md:pt-6 pb-2 mt-6 text-center space-y-6"
          onSubmit={(ev) => ev.preventDefault()}
        >
          <div className="space-y-2">
            <LangToggle enabled={enabled} setEnabled={setEnabled} />
            <h4>Locale</h4>
          </div>

          <span className="inline-flex w-full sm:w-auto focus-within:ring hover:bg-opacity-70 transition duration-300 ring-accent flex-col md:flex-row bg-gray-200 dark:bg-blue-gray-800 overflow-x-hidden rounded-md">
            <span className="py-3 md:py-2 p-2 inline-flex text-accent">
              <Icon icon={emailIcon} className="w-8 h-8 md:w-12 md:h-12" />
              <input
                className="bg-transparent ml-2 text-2xl md:w-auto md:text-3xl flex-1"
                spellCheck="false"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter email"
                required
                maxLength={254}
                value={email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </span>

            <button
              disabled={disabled}
              onClick={handleClick}
              className="bg-accent hover:opacity-70 disabled:delay-300 disabled:opacity-40 transition duration-300 disabled:cursor-not-allowed  font-bold text-xl p-3"
            >
              {pending || isLoading ? (
                <span className="inline-block min-w-[112px]">...Loading</span>
              ) : (
                <span>SUBSCRIBE</span>
              )}
            </button>
          </span>
        </form>

        <div className="text-center text-gray-400">
          I won't send you spam and you can unsubscribe at any time
          {PrivacyPolicy}
        </div>
      </div>
    )
  }
)

export default Newsletter
export type { ClickEventHandler }
