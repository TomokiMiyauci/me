import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import type { User, Auth } from 'firebase/auth'

let hasTrySignedIn = false
const getUser = (auth: Auth): Promise<User | undefined> =>
  new Promise<User | undefined>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        if (hasTrySignedIn) return
        hasTrySignedIn = true
        const { user } = await signInAnonymously(auth).catch(() => ({
          user: undefined
        }))
        resolve(user)
        console.log('Sing in as Anonymous')
      }
    })
  })

export { getUser }
