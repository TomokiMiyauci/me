import { initializeApp } from 'firebase/app'
import { initializePerformance } from 'firebase/performance'
import { initializeAnalytics, isSupported } from 'firebase/analytics'
import { firebaseOptions } from '@/../config/constants'

import type { FirebaseState } from '@/types/firebase'
import { isProd } from '@/utils/environment'

const initializeFirebase = (): FirebaseState => {
  const app = initializeApp(firebaseOptions)

  // if (process.env.NODE_ENV === 'development') {
  //   connectFirestoreEmulator(firestore, 'localhost', 8082)
  //   connectAuthEmulator(auth, 'http://localhost:9099')
  // }

  if (isProd) {
    initializePerformance(app)

    isSupported().then((e) => {
      if (e) {
        console.info('Initialize: analytics')
        initializeAnalytics(app)
      }
    })
  }

  return {
    app
  }
}

export { initializeFirebase }
