import { initializeApp } from 'firebase/app'
import { firebaseOptions } from '../config/constants'
import {
  initializeFirestore,
  collection,
  getDocs,
  CollectionReference,
  limit,
  orderBy,
  query
} from 'firebase/firestore/lite'
import type { Post } from '../src/types/firestore'

const setupAccessCount = () => {
  let data: Record<string, number | undefined> = {}
  let called: boolean = false
  let done: boolean = false

  const getAccessCount = async (): Promise<
    Record<string, number | undefined>
  > => {
    if (!called) {
      called = true
      const app = initializeApp(firebaseOptions)
      const firestore = initializeFirestore(app, {})
      const col = collection(firestore, 'posts') as CollectionReference<Post>
      const docs = await getDocs(query(col, orderBy('view', 'desc'), limit(5)))

      docs.forEach((doc) => {
        const { slug, view } = doc.data()
        data = { ...data, [slug]: view }
      })

      console.info('fetch post data')
      done = true
      return data
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (done) {
            resolve(data)
          } else {
            getAccessCount()
          }
        }, 2000)
      })
    }
  }
  return {
    getAccessCount
  }
}

export { setupAccessCount }
