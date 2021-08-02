import admin from 'firebase-admin'
import { configure } from 'eta'

const setup = (): void => {
  admin.initializeApp()

  configure({
    views: 'views'
  })
}

export { setup }
