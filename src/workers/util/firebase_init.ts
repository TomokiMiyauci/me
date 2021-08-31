import { initializeApp } from 'firebase/app'
import { initializeAuth, connectAuthEmulator } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging/sw'
import { firebaseOptions } from '@/../config/constants'
import { isProd } from '@/utils/environment'

const app = initializeApp(firebaseOptions)
const messaging = getMessaging(app)
const auth = initializeAuth(app)

if (!isProd) {
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true
  })
}

export { app, messaging, auth }
