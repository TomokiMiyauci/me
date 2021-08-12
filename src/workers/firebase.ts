import { initializeApp, FirebaseApp } from 'firebase/app'
import { initializePerformance } from 'firebase/performance'
import { initializeAnalytics, isSupported } from 'firebase/analytics'
import { PostsField } from '@/types/firestore'
import {
  initializeFirestore,
  connectFirestoreEmulator,
  doc,
  setDoc,
  DocumentReference,
  increment,
  Firestore,
  getDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore/lite'
import {
  initializeAuth,
  signInAnonymously,
  onAuthStateChanged,
  connectAuthEmulator,
  indexedDBLocalPersistence,
  User,
  Auth
} from 'firebase/auth'
import { firebaseOptions } from '@/../config/constants'
import type { Post } from '@/types/firestore'
import type { AnyFn } from 'fonction'

import { isProd } from '@/utils/environment'

type FirebaseState = {
  app: FirebaseApp
  firestore: Firestore
  auth: Auth
}

const initializeFirebase = (): FirebaseState => {
  const app = initializeApp(firebaseOptions)
  const firestore = initializeFirestore(app, {})
  const auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence
  })

  if (process.env.NODE_ENV !== 'production') {
    connectFirestoreEmulator(firestore, 'localhost', 8082)
    connectAuthEmulator(auth, 'http://localhost:9099')
  }

  // }

  // if (isProd) {
  //   initializePerformance(app)

  //   isSupported().then((e) => {
  //     if (e) {
  //       console.info('Initialize: analytics')
  //       initializeAnalytics(app)
  //     }
  //   })
  // }

  return {
    app,
    firestore,
    auth
  }
}

const signIn = (auth: Auth): Promise<User> =>
  new Promise<User>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      unsubscribe()
      if (_user) {
        resolve(_user)
        return
      }
      const { user } = await signInAnonymously(auth)
      console.log('Sign in as Anonymous')
      resolve(user)
    })
  })

const callOnSingIn = (fn: AnyFn) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      unsubscribe()
      fn(user.uid)
    }
  })
}

const { firestore, auth } = initializeFirebase()

type Message = InitMessage | CountMessage | LikeMessage | GetLikeMessage

type InitMessage = {
  type: 'init'
}

type CountMessage = {
  type: 'count'
  body: {
    slug: string
  }
}

type LikeMessage = {
  type: 'like'
  body: {
    slug: string
  }
}

type GetLikeMessage = {
  type: 'getLike'
  body: {
    slug: string
  }
}

onmessage = async ({ data }: MessageEvent<Message>) => {
  if (data.type === 'count') {
    callOnSingIn(() => {
      const { slug } = data.body

      const document = doc(firestore, slug) as DocumentReference<PostsField>
      setDoc(
        document,
        {
          slug,
          view: increment(1)
        },
        {
          merge: true
        }
      ).then(() => {
        console.log('great')
      })
    })
  } else if (data.type === 'init') {
    const user = await signIn(auth)
    self.postMessage(user.uid)
  } else if (data.type === 'like') {
    const user = await signIn(auth)
    const { slug } = data.body
    const document = doc(firestore, slug) as DocumentReference<PostsField>

    await setDoc(
      document,
      {
        clap: increment(1),
        clapBy: arrayUnion(user.uid)
      },
      {
        merge: true
      }
    )
    self.postMessage('')
  } else if (data.type === 'unlike') {
    const user = await signIn(auth)
    const { slug } = data.body
    const document = doc(firestore, slug) as DocumentReference<PostsField>

    await setDoc(
      document,
      {
        clap: increment(-1),
        clapBy: arrayRemove(user.uid)
      },
      {
        merge: true
      }
    )
    self.postMessage('')
  } else if (data.type === 'getLike') {
    const { slug } = data.body
    const document = doc(firestore, slug) as DocumentReference<Post>

    getDoc(document).then((e) => {
      const clap = e.data()?.clap ?? 0
      const clapBy = e.data()?.clapBy

      self.postMessage({
        clap,
        clapBy
      })
    })
  }
}
