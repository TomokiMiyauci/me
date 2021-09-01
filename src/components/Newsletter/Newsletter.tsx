import { FC, MouseEventHandler, useState, useMemo } from 'react'
import emailIcon from '@iconify-icons/mdi/email'
import { Icon } from '@iconify/react/dist/offline'

import isEmail from 'is-email'

type ClickEventHandler = (email: string) => Promise<void>

const Newsletter: FC<{
  pending?: boolean
  onClick: ClickEventHandler
  className?: string
  onSuccess: () => void
  onError: () => void
}> = ({ pending, onClick, onError, onSuccess, className }) => {
  const [email, changeEmail] = useState('')
  const [isLoading, changeLoading] = useState(false)

  const handleClick: MouseEventHandler = () => emitEvent()

  const emitEvent = (): void => {
    if (!isValid || isLoading) return
    changeLoading(true)

    onClick(email)
      .then(onSuccess)
      .then(() => changeEmail(''))
      .catch(onError)
      .finally(() => changeLoading(false))
  }

  const isValid = useMemo(() => isEmail(email) as boolean, [email])
  const disabled = useMemo(
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

      <div className="md:pt-6 pb-2 mt-6 text-center">
        <form
          onSubmit={(ev) => ev.preventDefault()}
          className="inline-flex w-full sm:w-auto focus-within:ring hover:bg-opacity-70 transition duration-300 ring-accent flex-col md:flex-row bg-gray-200 dark:bg-blue-gray-800 overflow-x-hidden  rounded-md"
        >
          <span className="py-3 md:py-2 p-2 inline-flex text-accent">
            <Icon icon={emailIcon} className="w-8 h-8 md:w-12 md:h-12" />
            <input
              className="bg-transparent ml-2 text-2xl md:w-auto md:text-3xl"
              spellCheck="false"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => changeEmail(e.target.value)}
              onKeyPress={(ev) => {
                if (ev.key == 'Enter') {
                  ev.preventDefault()
                  emitEvent()
                }
              }}
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
        </form>
      </div>

      <div className="text-center text-gray-400">
        I won't send you spam and you can unsubscribe at any time
      </div>
    </div>
  )
}

export default Newsletter
export type { ClickEventHandler }
