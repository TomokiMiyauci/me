import { signIn } from '@/workers/util/auth'
import { auth } from '@/workers/util/firebase_init'
import { getIdToken } from 'firebase/auth'
import { includes } from 'core-fn'
declare var self: ServiceWorkerGlobalScope & typeof globalThis

const authedRequest = (req: Request, idToken: string): Request => {
  const headers = new Headers(req.headers)
  headers.append('Authorization', `Bearer ${idToken}`)
  const request = new Request(req, {
    headers
  })
  return request
}

const whitelist = ['https://firestore.googleapis.com']

self.addEventListener('fetch', async (evt) => {
  const requestProcessor = async () => {
    const url = new URL(evt.request.url)

    let request: Request = evt.request
    if (
      includes(url.origin, whitelist) ||
      url.origin === 'http://localhost:8080'
    ) {
      const user = await signIn(auth)
      const idToken = await getIdToken(user)
      request = authedRequest(evt.request, idToken)
    }

    return fetch(request)
  }

  evt.respondWith(requestProcessor())
})
