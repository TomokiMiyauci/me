import React, { FC, useEffect, useState, useMemo } from 'react'
import type { ActualPost } from '@/types/firestore'
import Clap from './Clap'
import Circle from '@/components/ProgressCircle'
import { useSequence } from '@/hooks/state'
import { useNotice } from '@/hooks/notice'
import { isBrowser } from '@/utils/environment'
import { useLinkedWorker } from '@/hooks/worker'
import type { PostSlugWorker } from '@/workers/firestore/firestore.worker'

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
  const [_worker] = useState(() => {
    if (isBrowser) {
      return new Worker(
        new URL('@/workers/firestore/firestore.worker', import.meta.url)
      )
    }
  })

  const worker = useLinkedWorker<PostSlugWorker>(_worker)

  const [postMeta, changePostMeta] = useState<ActualPost>({})
  const { isWaiting, waitUntil } = useWait()
  const [uid, setUid] = useState<string | undefined>(undefined)
  const [_, sequence] = useSequence()
  const [__, notice] = useNotice()
  const liked = useMemo<boolean>(() => {
    if (!postMeta.likeBy || !uid) return false

    return postMeta.likeBy.some(async (id) => {
      return id === uid
    })
  }, [postMeta, uid])

  const On = () => {
    const fn = liked ? decrement : increment
    return sequence(fn)
  }

  const decrement = async () => {
    const data = await worker!.decrement(slug)

    changePostMeta(data)
    notice({
      type: 'success',
      field: <div>Canceled liking this article</div>
    })
    waitUntil(3000)
  }
  const increment = async () => {
    const data = await worker!.increment(slug)
    changePostMeta(data)

    notice({
      type: 'success',
      field: <div>Liked this article</div>
    })
    waitUntil(3000)
  }

  useEffect(() => {
    if (!worker) return

    worker.getPostSlug(slug).then((data) => {
      changePostMeta(data)
      setUid(data.uid)
    })
  }, [])

  const disabledClass = useMemo<string>(() => {
    if (isWaiting) {
      return 'disabled:cursor-wait'
    }

    return ''
  }, [isWaiting])

  return (
    <span>
      <Circle
        isStart={!isWaiting}
        circleClass="text-accent"
        className={`w-5 h-5 ease-out ${isWaiting ? 'visible' : 'invisible'}`}
      />

      <Clap
        fill={liked}
        disabled={isWaiting}
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
