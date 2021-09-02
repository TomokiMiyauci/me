import { initializeApp, sequence, pretty } from './util'
import type { QuerySnapshot } from '@google-cloud/firestore'

const getLike = async (): Promise<Record<string, number>> => {
  const clientEmail = process.env.CLIENT_EMAIL
  const privateKey = process.env.PRIVATE_KEY

  if (!clientEmail || !privateKey) {
    console.error('env variable is not exists')
    return {}
  }

  const { docs } = (await initializeApp(clientEmail, pretty(privateKey))
    .firestore()
    .collection('posts')
    .where('like', '>', 0)
    .orderBy('like', 'desc')
    .limit(10)
    .get()
    .catch(() => {
      console.log('Something error')
      return {
        docs: []
      }
    })) as QuerySnapshot<{
    like: number | undefined
  }>

  return docs.reduce((acc, cur) => {
    const like = cur.data().like
    acc = { ...acc, [cur.id]: like ?? 0 }

    return acc
  }, {} as Record<string, number>)
}

const safeGetLike = sequence(getLike)

safeGetLike().then((e) => {
  console.log(e)
})

export { safeGetLike }
