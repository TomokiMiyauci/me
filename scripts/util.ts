import admin from 'firebase-admin'
import { replace } from 'core-fn'

const initializeApp = (clientEmail: string, privateKey: string) =>
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail,
      privateKey,
      projectId: 'blorogue'
    })
  })

const pretty = replace(/\\n/g, '\n')

export { initializeApp, pretty }
