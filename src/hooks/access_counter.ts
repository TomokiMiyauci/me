import { useEffect } from 'react'
import { useFirestoreLite } from '@/hooks/firebase/firestore_lite'
import { PostsField } from '@/types/firestore'
import {
  doc,
  setDoc,
  increment,
  DocumentReference
} from 'firebase/firestore/lite'

const useAccessCounter = (slug: string) => {
  const firestore = useFirestoreLite()
  useEffect(() => {
    if (!firestore) return
    const document = doc(firestore, slug) as DocumentReference<PostsField>
    setDoc(
      document,
      {
        slug,
        view: increment(1)
      },
      {
        merge: true
      }
    )
  }, [firestore])
}

export { useAccessCounter }
