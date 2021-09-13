import { getUser } from '@/workers/util/auth'
import { auth } from '@/workers/util/firebase_init'
import type { User } from '@/types/user'

declare var self: ServiceWorkerGlobalScope & typeof globalThis

self.addEventListener('message', async ({ source }) => {
  const user = await getUser(auth)

  if (user) {
    const message: User = {
      uid: user.uid,
      isAnonymous: user.isAnonymous
    }
    const _source = source as ServiceWorker
    _source.postMessage(message)
  }
})
