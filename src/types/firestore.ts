import type { Timestamp, FieldValue } from 'firebase/firestore/lite'

type PostsField = {
  createdAt?: Timestamp
  slug: string
  clap: FieldValue
  clapBy: FieldValue
  view: FieldValue
}

type Post = {
  createdAt?: Timestamp
  slug: string
  clap?: number
  clapBy?: string[]
  view: number
}

export type { PostsField, Post }
