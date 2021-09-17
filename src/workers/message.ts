import { getUser } from '@/workers/util/auth'
import { auth } from '@/workers/util/firebase_init'
import type { User } from '@/types/user'

declare var self: ServiceWorkerGlobalScope & typeof globalThis

self.addEventListener('message', async ({ source }) => {
  const user = await getUser(auth)

  if (user) {
    const { displayName, uid, isAnonymous, emailVerified, photoURL } = user
    const message: User = {
      displayName,
      uid,
      isAnonymous,
      emailVerified,
      photoURL
    }
    const _source = source as ServiceWorker
    _source.postMessage(message)
  }
})
