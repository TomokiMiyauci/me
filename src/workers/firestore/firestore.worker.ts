import { auth, firestore } from '@/workers/util/firebase_init'
import { getUser } from '@/workers/util/auth'
import {
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore/lite'
import type { DocumentReference } from 'firebase/firestore/lite'
import type { Post, PostsField, ActualPost } from '@/types/firestore'
import { expose } from 'comlink'

const postsSlug = {
  like: 0,
  likeBy: [] as string[],
  uid: undefined as string | undefined,

  get post(): ActualPost & { uid: string | undefined } {
    return {
      like: this.like,
      likeBy: this.likeBy,
      uid: this.uid
    }
  },

  set post({ likeBy, like }: ActualPost) {
    this.like = like ?? 0
    this.likeBy = likeBy ?? []
  },

  async getPostSlug(data: string) {
    const user = await getUser(auth)
    this.uid = user?.uid
    const document = doc(firestore!, 'posts', data) as DocumentReference<Post>
    const snapshot = await getDoc(document)

    const likeBy = snapshot.data()?.likeBy?.map((ref) => {
      return ref.id
    })

    this.post = { ...snapshot.data(), likeBy }

    return this.post
  },

  async increment(slug: string): Promise<ActualPost> {
    const user = await getUser(auth)
    this.uid = user?.uid
    const document = doc(
      firestore!,
      'users',
      user?.uid!,
      'likePosts',
      slug
    ) as DocumentReference<PostsField>

    await setDoc(document, {
      postRef: doc(firestore!, 'posts', slug),
      createdAt: serverTimestamp()
    }).then(() => {
      this.post = {
        like: this.like + 1,
        likeBy: [...this.likeBy, user!.uid]
      }
    })

    return this.post
  },

  async decrement(slug: string): Promise<ActualPost> {
    const user = await getUser(auth)
    this.uid = user?.uid

    const document = doc(
      firestore!,
      'users',
      user?.uid!,
      'likePosts',
      slug
    ) as DocumentReference<PostsField>

    await deleteDoc(document).then(() => {
      this.post = {
        like: this.like - 1,
        likeBy: this.likeBy?.filter((id) => id !== user?.uid)
      }
    })

    return this.post
  }
}

expose(postsSlug)

type PostSlugWorker = typeof postsSlug

export type { PostSlugWorker }
