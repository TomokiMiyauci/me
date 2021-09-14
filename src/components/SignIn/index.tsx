import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  browserPopupRedirectResolver,
  linkWithCredential,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  signOut
} from 'firebase/auth'
import { useFirebase } from '@/hooks/firebase'
import { Fragment, useEffect } from 'react'
import { getUser } from '@/utils/auth'
import { useAuth } from '@/hooks/auth'
import googleIcon from '@iconify/icons-grommet-icons/google'
import { Icon } from '@iconify/react/dist/offline'
import emailIcon from '@iconify-icons/mdi/email-outline'
import shieldKeyOutline from '@iconify-icons/mdi/shield-key-outline'
import sendAlt from '@iconify-icons/carbon/send-alt'
import githubIcon from '@iconify/icons-akar-icons/github-fill'
import type { FC, MouseEventHandler } from 'react'
import { useSwitch } from '@/hooks/state'
import { Transition } from '@headlessui/react'
import { navigate } from 'gatsby'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'

const email = 'aaa@a.com'
const password = 'password!'

const SignIn: FC<{ redirect?: string }> = ({ redirect }) => {
  const [{ app, auth }, change] = useFirebase()
  const [overlay, { on: show, off: hide }] = useSwitch()
  const [_, setUser] = useAuth()

  const f: MouseEventHandler = async () => {
    if (!auth) return

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
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
    if (!app) return
    const auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver
    })
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true
    })

    change({
      auth
    })

    getUser(auth).then((user) => {
      console.log(user)
    })
  }, [app])

  const handleClick: MouseEventHandler = () => {
    if (!auth) return
    const provider = new GithubAuthProvider()
    show()
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        if (userCredential) {
          setUser(userCredential.user)
        }

        if (redirect) {
          navigate(redirect)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        hide()
      })
  }

  const handleGoogle: MouseEventHandler = () => {
    if (!auth) return
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
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
                onClick={handleClick}
              >
                <Icon className="w-6 h-6 text-white" icon={githubIcon} />
                <span>Sign in with GitHub</span>
              </button>

              <button
                className="rounded-md bg-gray-900 py-2 px-4 space-x-4"
                onClick={handleGoogle}
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
        <div className="inset-0 fixed backdrop-blur flex flex-col items-center space-y-4 justify-center">
          <ProgressCircle />
          <span>waiting for sign in...</span>
        </div>
      </Transition>
    </>
  )
}

export default SignIn
