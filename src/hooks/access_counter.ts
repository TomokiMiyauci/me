import { useEffect } from 'react'

const useAccessCounter = (slug: string) => {
  useEffect(() => {
    const worker = new Worker('/worker.js')

    worker.postMessage({
      type: 'count',
      body: {
        slug
      }
    })
  }, [])
}

export { useAccessCounter }
