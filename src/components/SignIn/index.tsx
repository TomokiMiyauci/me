import {
  linkWithCredential,
  linkWithPopup,
  signInWithEmailAndPassword,
  EmailAuthProvider
} from 'firebase/auth'
import { useFirebaseApp } from '@/hooks/firebase/app'
import { Fragment, useEffect, useContext } from 'react'
import { getUser } from '@/utils/firebase/auth'
import googleIcon from '@iconify/icons-grommet-icons/google'
import { Icon } from '@iconify/react/dist/offline'
import AuthContext from '@/contexts/firebase/auth'
import emailIcon from '@iconify-icons/mdi/email-outline'
import shieldKeyOutline from '@iconify-icons/mdi/shield-key-outline'
import sendAlt from '@iconify-icons/carbon/send-alt'
import githubIcon from '@iconify/icons-akar-icons/github-fill'
import type { FC, MouseEventHandler } from 'react'
import { useSwitch } from '@/hooks/state'
import { Transition } from '@headlessui/react'
import { navigate } from 'gatsby'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import { useNotice } from '@/hooks/notice'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'
import { initializeAuth } from '@/utils/firebase/auth'
import UserContext from '@/contexts/user'

import type { AuthProvider, AuthError } from 'firebase/auth'

const SignIn: FC<{ redirect?: string }> = ({ redirect }) => {
  const app = useFirebaseApp()
  const [auth, setAuth] = useContext(AuthContext)
  const [overlay, { on: show, off: hide }] = useSwitch()
  const [_, setUser] = useContext(UserContext)
  const notice = useNotice()
  const { safeLogEvent } = useSafeLogEvent()

  const signUp: MouseEventHandler = async () => {
    if (!auth) return

    const userCredential = await signInWithEmailAndPassword(auth, '', '')
    setUser(userCredential.user)
  }

  const handleSignUp: MouseEventHandler = async () => {
    if (!auth) return
    const user = await getUser(auth)
    if (!user) return
    const credential = EmailAuthProvider.credential(email, password)
    const userCredential = await linkWithCredential(user, credential)
    setUser(userCredential.user)
  }

  useEffect(() => {
    if (!app || auth) return
    const _auth = initializeAuth(app)

    setAuth(_auth)
  }, [app])

  const passProvider = async (provider: AuthProvider) => {
    if (!auth) return
    const user = await getUser(auth)
    if (!user) return

    show()
    return linkWithPopup(user, provider)
      .then((userCredential) => {
        notice({
          type: 'success',
          field: <div>Success login</div>
        })
        safeLogEvent((analytics, logEvent) =>
          logEvent(analytics, 'login', {
            providerId: provider.providerId
          })
        )
        if (userCredential) {
          setUser(userCredential.user)
        }

        if (redirect) {
          navigate(redirect)
        }
      })
      .catch(({ code, message, name, appName }: AuthError) => {
        if (code !== 'auth/popup-closed-by-user') {
          notice({
            type: 'alert',
            field: <div>{message}</div>
          })
          safeLogEvent((analytics, logEvent) =>
            logEvent(analytics, 'exception', {
              name,
              appName,
              description: message
            })
          )
        }
      })
      .finally(hide)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <div className="absolute -inset-0.5 blur gradation rounded-xl" />
          <div className="relative bg-blue-gray-800 p-12 rounded-xl">
            <div className="flex flex-col justify-center items-center space-y-4">
              <button
                className="rounded-md bg-gray-900 py-2 px-4 space-x-4"
                onClick={async () => {
                  const { GithubAuthProvider } = await import('firebase/auth')
                  passProvider(new GithubAuthProvider())
                }}
              >
                <Icon className="w-6 h-6 text-white" icon={githubIcon} />
                <span>Sign in with GitHub</span>
              </button>

              <button
                className="rounded-md bg-gray-900 py-2 px-4 space-x-4"
                onClick={async () => {
                  const { GoogleAuthProvider } = await import('firebase/auth')
                  passProvider(new GoogleAuthProvider())
                }}
              >
                <Icon className="w-6 h-6" icon={googleIcon} />
                <span className="align-middle">Sign in with Google</span>
              </button>
            </div>
            {/* <hr className="my-6 border-gray-500" />

            <div className="space-y-5">
              <span className="flex items-center space-x-2 p-2 bg-blue-gray-700 rounded-md">
                <Icon icon={emailIcon} className="w-7 h-7" />
                <input
                  className="bg-transparent"
                  placeholder="Enter email"
                  required
                  maxLength={254}
                  type="email"
                  name="email"
                />
              </span>

              <span className="flex items-center space-x-2 p-1 bg-gray-700 rounded-md">
                <Icon icon={shieldKeyOutline} className="w-7 h-7" />
                <input
                  className="bg-transparent"
                  placeholder="Enter password"
                  type="password"
                  name="password"
                />
              </span>

              <div className="text-right">
                <button className="p-1 rounded-md space-x-2">
                  <Icon icon={sendAlt} className="w-7 h-7" />
                  <span className="uppercase align-middle">send</span>
                </button>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      <Transition
        enterFrom="opacity-0"
        enter="transition duration-1000"
        leave="transition duration-1000"
        leaveTo="opacity-0"
        as={Fragment}
        show={overlay}
      >
        <div className="inset-0 fixed backdrop-blur flex flex-col items-center space-y-6 justify-center">
          <ProgressCircle />
          <span>waiting for sign in...</span>
        </div>
      </Transition>
    </>
  )
}

export default SignIn
