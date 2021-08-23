import { initializeApp, pretty } from './util'
import { isUndefined } from '@miyauci/is-valid'

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })

const setupAccessCount = () => {
  let data: Record<string, number | undefined> = {}
  let called: boolean = false
  let done: boolean = false

  const getAccessCount = async (): Promise<
    Record<string, number | undefined>
  > => {
    if (!called) {
      called = true
      const clientEmail = process.env.CLIENT_EMAIL
      const privateKey = process.env.PRIVATE_KEY

      if (isUndefined(clientEmail) || isUndefined(privateKey)) {
        done = true
        return data
      }

      const app = initializeApp(clientEmail, pretty(privateKey))

      try {
        const docs = await app
          .firestore()
          .collection('posts')
          .orderBy('view', 'desc')
          .limit(10)
          .get()
          .catch((e) => {
            console.error(e)
            return []
          })

        docs.forEach((doc) => {
          const { slug, view } = doc.data()
          data = { ...data, [slug]: view }
        })
      } finally {
        console.info('fetch post data')
        done = true
      }
      return data
    } else {
      return new Promise(async (resolve) => {
        while (!done) {
          await wait(1000)
        }

        resolve(data)
      })
    }
  }
  return {
    getAccessCount
  }
}

export { setupAccessCount }
