import type { Timestamp, FieldValue } from 'firebase/firestore/lite'

type PostsField = {
  createdAt?: Timestamp
  slug: string
  clap: FieldValue
  clapBy: FieldValue
  view: FieldValue
}

export type { PostsField }
