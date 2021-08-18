import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging/sw'
import { firebaseOptions } from '@/../config/constants'

const app = initializeApp(firebaseOptions)
const messaging = getMessaging(app)

export { app, messaging }
