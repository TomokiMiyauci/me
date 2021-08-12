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

    // const document = doc(firestore, slug) as DocumentReference<PostsField>
    // setDoc(
    //   document,
    //   {
    //     slug,
    //     view: increment(1)
    //   },
    //   {
    //     merge: true
    //   }
    // )
  }, [])
}

export { useAccessCounter }
