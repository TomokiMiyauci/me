import './assets/global.scss'
import './assets/prose.scss'

import { initializeAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { firebaseOptions } from './config/constants'

const app = initializeApp(firebaseOptions)

initializeAnalytics(app)
