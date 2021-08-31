import type {
  Timestamp,
  FieldValue,
  DocumentReference
} from 'firebase/firestore/lite'

type Override<T extends Record<PropertyKey, unknown>, U extends keyof T, X> = {
  [k in keyof Omit<T, U>]: T[k]
} &
  {
    [x in U]: X
  }

type PostsField = {
  postRef: DocumentReference
  createdAt?: FieldValue
}

type Post = {
  createdAt?: Timestamp
  slug: string
  like?: number
  likeBy?: DocumentReference[]
  view: number
}

type ActualPost = Partial<Override<Post, 'likeBy', string[]>>

export type { PostsField, Post, ActualPost }
