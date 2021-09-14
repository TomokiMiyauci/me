import {
  onAuthStateChanged,
  initializeAuth as _initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  browserPopupRedirectResolver
} from 'firebase/auth'
import { isProd } from '@/utils/environment'
import type { FirebaseApp } from 'firebase/app'
import type { Auth, User } from 'firebase/auth'

const getUser = (auth: Auth): Promise<User | undefined> => {
  return new Promise<User | undefined>((resolve) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        if (user) {
          resolve(user)
        } else {
          resolve(undefined)
        }
      },
      () => {
        resolve(undefined)
      }
    )
  })
}

/**
 * Initializes an Auth instance with fine-grained control over Dependencies.
 * @param app FirebaseApp
 */
const initializeAuth = (app: FirebaseApp): Auth => {
  const auth = _initializeAuth(app, {
    persistence: indexedDBLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver
  })
  if (!isProd) {
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true
    })
  }
  return auth
}

export { getUser, initializeAuth }
