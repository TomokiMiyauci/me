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
  getDoc
} from 'firebase/firestore/lite'
import {
  initializeAuth,
  signInAnonymously,
  browserLocalPersistence,
  connectAuthEmulator,
  Auth
} from 'firebase/auth'
import { firebaseOptions } from '@/../config/constants'
import type { Post } from '@/types/firestore'

import { isProd } from '@/utils/environment'

type FirebaseState = {
  app: FirebaseApp
  firestore: Firestore
  auth: Auth
}

const initializeFirebase = (): FirebaseState => {
  const app = initializeApp(firebaseOptions)
  const firestore = initializeFirestore(app, {})
  const auth = initializeAuth(app)

  // if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(firestore, 'localhost', 8082)
  connectAuthEmulator(auth, 'http://localhost:9099')

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

const { firestore, auth } = initializeFirebase()

type Message = CountMessage | LikeMessage | GetLikeMessage

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
    console.log(123)
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
  } else if (data.type === 'like') {
    const { slug } = data.body
    console.log('increment', slug)
    const document = doc(firestore, slug) as DocumentReference<PostsField>

    console.log(auth!.currentUser!.uid)

    setDoc(
      document,
      {
        clap: increment(1)
      },
      {
        merge: true
      }
    )
  } else if (data.type === 'getLike') {
    const { slug } = data.body
    const document = doc(firestore, slug) as DocumentReference<Post>

    getDoc(document).then((e) => {
      const r = e.data()?.clap ?? 0
      const by = e.data()?.clapBy
    })
  }
}
