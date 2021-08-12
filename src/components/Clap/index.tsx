import React, { FC, useEffect, useState, useMemo } from 'react'

import type { Post } from '@/types/firestore'
import { useAuth } from '@/hooks/auth'
import Clap from '@/components/Clap/Clap'

const Index: FC<{ slug: string }> = ({ slug }) => {
  const [postMeta, changePostMeta] = useState<Partial<Post>>({})
  const [{ uid, isLoggedIn }] = useAuth()
  const liked = useMemo<boolean>(() => {
    if (!postMeta.clapBy || !isLoggedIn) return false
    return postMeta.clapBy.includes(uid)
  }, [postMeta, uid])

  const On = () => {
    if (liked) {
      return decrement()
    } else {
      return increment()
    }
  }

  const decrement = async () => {
    const worker = new Worker('/worker.js')
    worker.addEventListener('message', () => {
      const clap = (postMeta.clap ?? 0) - 1
      const meta = {
        ...postMeta,
        clap,
        clapBy: (postMeta.clapBy ?? []).filter((id) => id !== uid)
      }
      changePostMeta(meta)
    })

    worker.postMessage({
      type: 'unlike',
      body: {
        slug
      }
    })
  }
  const increment = async () => {
    const worker = new Worker('/worker.js')
    worker.addEventListener('message', () => {
      const clap = (postMeta.clap ?? 0) + 1
      const meta = {
        ...postMeta,
        clap,
        clapBy: [...(postMeta.clapBy ?? []), uid]
      }
      changePostMeta(meta)
    })

    worker.postMessage({
      type: 'like',
      body: {
        slug
      }
    })
  }

  useEffect(() => {
    const worker = new Worker('/worker.js')
    worker.addEventListener('message', ({ data }: MessageEvent<Post>) => {
      changePostMeta(data)
    })
    worker.postMessage({
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
