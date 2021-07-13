import React, { FC, useContext } from 'react'
import Newsletter, { ClickEventHandler } from './Newsletter'
import FirebaseContext from '../Firebase/Context'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore/lite'

const Index: FC = () => {
  const { firestore } = useContext(FirebaseContext)

  const onClick: ClickEventHandler = async (email) => {
    if (!firestore) return

    const document = doc(firestore, 'newsletters', email)

    setDoc(document, {
      email,
      createdAt: serverTimestamp()
    })
  }

  return (
    <Newsletter
      onClick={onClick}
      onSuccess={() => {
        import('canvas-confetti').then(({ default: _default }) => _default())
      }}
    />
  )
}

export default Index
