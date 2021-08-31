import type {
  Timestamp,
  FieldValue,
  DocumentReference
} from 'firebase/firestore/lite'

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

export type { PostsField, Post }
