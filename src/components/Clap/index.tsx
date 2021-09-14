import { FC, useEffect, useState, useMemo } from 'react'
import {
  getDoc,
  doc,
  setDoc,
  increment as _inc,
  DocumentReference,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore/lite'
import type { PostsField, Post } from '@/types/firestore'
import { useFirestoreLite } from '@/hooks/firebase/firestore_lite'
import Clap from './Clap'
import Circle from '@/components/ProgressCircle'
import { useSequence } from '@/hooks/state'
import { useNotice } from '@/hooks/notice'
import { useAuth } from '@/hooks/auth'

const useWait = (initState?: boolean) => {
  const [isWaiting, changeWaiting] = useState(initState ?? false)
  const [timeoutId, changeTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const waitUntil = (milliseconds: number): void => {
    changeWaiting(true)
    const timeoutId = setTimeout(() => {
      changeWaiting(false)
    }, milliseconds)
    changeTimeoutId(timeoutId)
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return {
    isWaiting,
    waitUntil
  }
}

const Index: FC<{ slug: string }> = ({ slug }) => {
  const firestore = useFirestoreLite()
  const [{ uid, isLoggedIn }] = useAuth()
  const [postMeta, changePostMeta] = useState<Partial<Post>>({})
  const { isWaiting, waitUntil } = useWait()
  const [_, sequence] = useSequence()
  const notice = useNotice()
  const liked = useMemo<boolean>(() => {
    if (!postMeta.likeBy || !firestore || !uid) return false

    return postMeta.likeBy.some(({ id }) => {
      return id === uid
    })
  }, [postMeta, firestore, uid])

  const On = () => {
    const fn = liked ? decrement : increment
    return sequence(fn)
  }

  const decrement = async () => {
    const clapCount = (postMeta.like ?? 0) - 1
    changePostMeta({
      like: clapCount,
      likeBy: postMeta.likeBy?.filter((by) => by.id !== uid)
    })
    const document = doc(
      firestore!,
      'users',
      uid!,
      'likePosts',
      slug
    ) as DocumentReference<PostsField>

    await deleteDoc(document)
    notice({
      type: 'success',
      field: <div>Canceled liking this article</div>
    })
    waitUntil(3000)
  }
  const increment = async () => {
    const clapCount = (postMeta.like ?? 0) + 1
    changePostMeta({
      like: clapCount,
      likeBy: [doc(firestore!, 'users', uid!), ...(postMeta.likeBy ?? [])]
    })
    const document = doc(
      firestore!,
      'users',
      uid!,
      'likePosts',
      slug
    ) as DocumentReference<PostsField>

    await setDoc(document, {
      postRef: doc(firestore!, 'posts', slug),
      createdAt: serverTimestamp()
    })
    notice({
      type: 'success',
      field: <div>Liked this article</div>
    })
    waitUntil(3000)
  }

  useEffect(() => {
    if (!firestore || !isLoggedIn) return
    const document = doc(firestore!, 'posts', slug) as DocumentReference<Post>
    getDoc(document)
      .then((e) => {
        changePostMeta({ like: e.data()?.like ?? 0, likeBy: e.data()?.likeBy })
      })
      .catch(() => {
        changePostMeta({ like: 0, likeBy: [] })
      })
  }, [firestore, isLoggedIn])

  const disabledClass = useMemo<string>(() => {
    if (isWaiting) {
      return 'disabled:cursor-wait'
    }
    if (!firestore || !isLoggedIn) {
      return 'disabled:cursor-not-allowed'
    }
    return ''
  }, [firestore, isLoggedIn, isWaiting])

  return (
    <span>
      <Circle
        isStart={!isWaiting}
        circleClass="text-accent"
        className={`w-5 h-5 ease-out ${isWaiting ? 'visible' : 'invisible'}`}
      />

      <Clap
        fill={liked}
        disabled={!firestore || !isLoggedIn || isWaiting}
        on={On}
        success={() => {}}
        error={() => {}}
        clap={postMeta.like ?? 0}
        className={`${disabledClass}`}
      />
    </span>
  )
}

export default Index
