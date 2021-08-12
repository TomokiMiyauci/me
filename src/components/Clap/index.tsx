import React, { FC, useEffect, useState, useMemo } from 'react'

import type { PostsField, Post } from '@/types/firestore'
import { useAuth } from '../../hooks/auth'
import Clap from './Clap'

const Index: FC<{ slug: string }> = ({ slug }) => {
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
    const worker = new Worker('/worker.js')

    worker.postMessage({
      type: 'like',
      body: {
        slug
      }
    })
  }
  const increment = () => {
    const worker = new Worker('/worker.js')

    worker.postMessage({
      type: 'like',
      body: {
        slug
      }
    })
  }

  useEffect(() => {
    new Worker('/worker.js').postMessage({
      type: 'getLike',
      body: {
        slug
      }
    })
  }, [])

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
