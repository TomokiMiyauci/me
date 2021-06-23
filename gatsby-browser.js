import './assets/global.scss'
import './assets/prose.scss'

import { initializeApp } from 'firebase/app'
import { initializeAnalytics } from 'firebase/analytics'

const app = initializeApp({
  apiKey: 'AIzaSyAN_gLPDQgXzROBhfpoEq7g-Wek6FY1kJE',
  authDomain: 'blorogue.firebaseapp.com',
  projectId: 'blorogue',
  storageBucket: 'blorogue.appspot.com',
  messagingSenderId: '205944386882',
  appId: '1:205944386882:web:f48733fc94e54f0de244db',
  measurementId: 'G-DWBGDDWNR9'
})

initializeAnalytics(app)
