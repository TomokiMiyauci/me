import React, { FC, useEffect, useState, useMemo } from 'react'
import {
  getDoc,
  doc,
  setDoc,
  increment as _inc,
  DocumentReference,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore/lite'
import type { PostsField, Post } from '@/types/firestore'
import { useFirebase } from '../../hooks/firebase'
import { useAuth } from '../../hooks/auth'
import Clap from './Clap'

const Index: FC<{ slug: string }> = ({ slug }) => {
  const [{ firestore }] = useFirebase()
  const [postMeta, changePostMeta] = useState<Partial<Post>>({})
  const [{ user, isLoggedIn }] = useAuth()
  const liked = useMemo<boolean>(() => {
    if (!postMeta.clapBy || !user) return false

    return postMeta.clapBy.includes(user.uid)
  }, [postMeta, user])

  const On = () => {
    if (liked) {
      return decrement()
    } else {
      return increment()
    }
  }

  const decrement = async () => {
    const clapCount = (postMeta.clap ?? 0) - 1
    changePostMeta({
      clap: clapCount,
      clapBy: postMeta.clapBy?.filter((by) => by !== user!.uid)
    })
    const document = doc(firestore!, slug) as DocumentReference<PostsField>

    return setDoc(
      document,
      {
        clap: _inc(-1),
        clapBy: arrayRemove(user!.uid)
      },
      {
        merge: true
      }
    )
  }
  const increment = () => {
    const clapCount = (postMeta.clap ?? 0) + 1
    changePostMeta({
      clap: clapCount,
      clapBy: [user!.uid, ...(postMeta.clapBy ?? [])]
    })
    const document = doc(firestore!, slug) as DocumentReference<PostsField>

    return setDoc(
      document,
      {
        clap: _inc(1),
        clapBy: arrayUnion(user!.uid)
      },
      {
        merge: true
      }
    )
  }

  useEffect(() => {
    if (!firestore) return
    const document = doc(firestore, slug) as DocumentReference<Post>
    getDoc(document).then((e) => {
      changePostMeta({ clap: e.data()?.clap ?? 0, clapBy: e.data()?.clapBy })
    })
  }, [firestore])

  return (
    <Clap
      fill={liked}
      disabled={!isLoggedIn}
      on={On}
      success={() => {}}
      error={() => {}}
      clap={postMeta.clap ?? 0}
    />
  )
}

export default Index
