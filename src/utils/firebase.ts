import { initializePerformance } from 'firebase/performance'
import { initializeAnalytics, isSupported } from 'firebase/analytics'
import type { FirebaseApp } from 'firebase/app'

const initializeFirebase = (app: FirebaseApp): void => {
  initializePerformance(app)

  if (process.env.NODE_ENV === 'production') {
    isSupported().then((e) => {
      if (e) {
        console.info('Initialize: analytics')
        initializeAnalytics(app)
      }
    })
  }
}

export { initializeFirebase }
