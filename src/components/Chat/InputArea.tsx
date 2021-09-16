import loadable from '@loadable/component'
import { Icon } from '@iconify/react/dist/offline'
import send28Filled from '@iconify/icons-fluent/send-28-filled'
import { useFirestore } from '@/hooks/firebase/firestore'
import { useUser } from '@/hooks/user'
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  FieldValue,
  CollectionReference,
  DocumentReference
} from 'firebase/firestore'
import { useState } from 'react'

const Textarea = loadable(() => import('react-autosize-textarea'))
import type { FC, MouseEventHandler } from 'react'
type MessageData<T extends FieldValue = FieldValue> = {
  createdAt: T
  type: string
  value: string
  userRef: DocumentReference
}

const InputArea: FC = () => {
  const { uid } = useUser()
  const [firestore] = useFirestore()
  const [message, changeMessage] = useState<string>('')

  const handleSend: MouseEventHandler = async () => {
    const col = collection(
      firestore!,
      'publicChatRooms',
      '0',
      'messages'
    ) as CollectionReference<MessageData>
    await addDoc(col, {
      type: 'text',
      value: message,
      createdAt: serverTimestamp(),
      userRef: doc(firestore!, 'users', uid!)
    })
      .then(() => {
        changeMessage('')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <span className="rounded-2xl inline-flex bg-gray-400 bg-opacity-20 backdrop-blur border dark:border-blue-gray-700 border-gray-200 flex-1">
        <Textarea
          placeholder="Enter message"
          className="bg-transparent pl-3 pr-2 py-1 flex-1"
          spellCheck="false"
          value={message}
          onChange={({ target }) => changeMessage(target.value)}
          maxRows={5}
        />
      </span>
      <button onClick={handleSend}>
        <Icon className="w-8 h-8" icon={send28Filled} />
      </button>
    </>
  )
}

export default InputArea
