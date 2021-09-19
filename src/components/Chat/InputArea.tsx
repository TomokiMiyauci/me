import { Icon } from '@iconify/react/dist/offline'
import send28Filled from '@iconify/icons-fluent/send-28-filled'
import { useFirestore } from '@/hooks/firebase/firestore'
import { useUser } from '@/hooks/user'
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState, useMemo } from 'react'
import Textarea from 'react-autosize-textarea'

import type { CollectionReference } from 'firebase/firestore'
import type {
  FC,
  MouseEventHandler,
  FormEventHandler,
  ChangeEvent
} from 'react'
import type { MessageData } from '@/components/Chat/types'

const InputArea: FC = () => {
  const user = useUser()
  const firestore = useFirestore()
  const [message, changeMessage] = useState<string>('')

  const handleChange: FormEventHandler = async ({
    target
  }: ChangeEvent<HTMLTextAreaElement>) => changeMessage(target.value)

  const isValidMessage = useMemo<boolean>(() => !!message.trim(), [message])

  const handleSend: MouseEventHandler = async () => {
    if (!isValidMessage) return
    changeMessage('')
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
      userRef: doc(firestore!, 'users', user.uid!),
      user: {
        uid: user.uid!,
        photoURL: user.photoURL ?? null,
        displayName: user.displayName ?? null
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      <span className="rounded-2xl inline-flex bg-gray-400 bg-opacity-20 backdrop-blur border dark:border-blue-gray-700 border-gray-200 flex-1">
        <Textarea
          async
          placeholder="Enter message"
          className="bg-transparent pl-3 pr-2 py-1 flex-1"
          spellCheck="false"
          value={message}
          onChange={handleChange}
          maxRows={5}
        />
      </span>
      <button
        className="disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-50"
        disabled={!isValidMessage}
        onClick={handleSend}
      >
        <Icon className="w-8 h-8" icon={send28Filled} />
      </button>
    </>
  )
}

export default InputArea
