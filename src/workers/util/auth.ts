import {
  onAuthStateChanged,
  signInAnonymously,
  User,
  Auth
} from 'firebase/auth'

let hasTrySignedIn = false
const signIn = (auth: Auth): Promise<User> => {
  return new Promise<User>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        if (hasTrySignedIn) return
        hasTrySignedIn = true
        const { user } = await signInAnonymously(auth)
        resolve(user)

        console.log('Sing in as Anonymous')
      }
    })
  })
}

export { signIn }
