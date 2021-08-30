import { getUser } from '@/workers/util/auth'
import { auth } from '@/workers/util/firebase_init'
import { getIdToken } from 'firebase/auth'

declare var self: ServiceWorkerGlobalScope & typeof globalThis

const makeAuthRequest = (req: Request, idToken: string): Request => {
  const headers = new Headers(req.headers)
  headers.set('Authorization', `Bearer ${idToken}`)
  const request = new Request(req, {
    headers
  })
  return request
}

const whitelist = ['https://firestore.googleapis.com']

self.addEventListener('fetch', async (ev) => {
  const requestProcessor = async (): Promise<Response> => {
    const url = new URL(ev.request.url)
    if (
      whitelist.includes(url.origin) ||
      url.origin === 'http://localhost:8080'
    ) {
      const user = await getUser(auth)

      if (user) {
        const idToken = await getIdToken(user)
        const request = makeAuthRequest(ev.request, idToken)
        return fetch(request)
      }
    }

    return fetch(ev.request)
  }

  ev.respondWith(requestProcessor())
})
