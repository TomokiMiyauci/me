import { onAuthStateChanged, User, Auth } from 'firebase/auth'

const getUser = (auth: Auth): Promise<User | undefined> => {
  return new Promise<User | undefined>((resolve) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        if (user) {
          resolve(user)
        } else {
          resolve(undefined)
        }
      },
      () => {
        resolve(undefined)
      }
    )
  })
}

export { getUser }
