import { signIn } from '@/workers/util/auth'
import { auth } from '@/workers/util/firebase_init'

declare var self: ServiceWorkerGlobalScope & typeof globalThis

self.addEventListener('message', async ({ source }) => {
  const user = await signIn(auth)
  const _source = source as ServiceWorker
  _source.postMessage(user.uid)
})
