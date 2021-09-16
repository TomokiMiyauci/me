import { Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { Timestamp } from '@firebase/firestore/dist/lite'
import { useFirestore } from '@/hooks/firebase/firestore'
import { useUser } from '@/hooks/user'
import {
  collection,
  onSnapshot,
  limit,
  FieldValue,
  CollectionReference,
  DocumentReference,
  query,
  orderBy
} from 'firebase/firestore'
import InputArea from '@/components/Chat/InputArea'
import Loading from '@/components/Chat/Loading'
import MustSignin from '@/components/SignIn/MustSignin'
import { useStep } from '@/components/Chat/hooks'

type MessageData<T extends FieldValue = FieldValue> = {
  createdAt: T
  type: string
  value: string
  userRef: DocumentReference
}

type Message = Pick<MessageData, 'type' | 'value'> & {
  id: string
  createdAt: Date
}

import type { FC } from 'react'
import { useMemo } from 'react'

const Chat: FC = () => {
  const [messages, changeMessages] = useState<Message[]>([])
  const [firestore] = useFirestore()

  useEffect(() => {
    if (!firestore) return
    const col = collection(
      firestore,
      'publicChatRooms',
      '0',
      'messages'
    ) as CollectionReference<MessageData<Timestamp>>

    const q = query(col, orderBy('createdAt', 'desc'), limit(5))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const shot = snapshot.docs.map((d) => {
        const { createdAt, ...rest } = d.data({
          serverTimestamps: 'estimate'
        })

        const date = createdAt.toDate()
        return {
          id: d.id,
          createdAt: date,
          ...rest
        }
      })

      changeMessages(shot)
    })

    return unsubscribe
  }, [firestore])

  return (
    <div className="flex-1 p-4">
      <section className="flex flex-col-reverse">
        {messages.map(({ value, id }) => {
          return (
            <div className="my-1" key={id}>
              <div className="rounded-xl inline-flex bg-gray-400 bg-opacity-20 py-1 px-3">
                {value}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

const useChat = () => {
  const { isAnonymous, isLoggedIn } = useUser()
  const [firestore] = useFirestore()

  useEffect(() => {
    if (!isLoggedIn) return
  }, [isLoggedIn])

  const writable = useMemo<boolean>(
    () => !!firestore && isAnonymous === false,
    [isAnonymous, firestore]
  )

  return { writable }
}

const ChatRoom: FC = () => {
  const { writable } = useChat()
  const step = useStep()

  return (
    <>
      {['INIT', 'LOGIN'].includes(step) && (
        <div className="h-full grid place-items-center">
          {step === 'INIT' && <Loading />}
          {step === 'LOGIN' && <MustSignin />}
        </div>
      )}

      <Transition
        enterFrom="opacity-0 translate-x-full"
        enter="transition transform duration-1000"
        leave="transition transform duration-1000"
        leaveTo="opacity-0 translate-x-full"
        show={step === 'AUTHED'}
      >
        <Chat />
      </Transition>
      <Transition
        enterFrom="opacity-0 translate-y-full"
        enter="transition transform duration-1000"
        leave="transition transform duration-1000"
        leaveTo="opacity-0 translate-y-full"
        show={true}
        appear={true}
        as={Fragment}
      >
        <div className="fixed bottom-0 container mx-auto w-full flex space-x-3 items-end p-2">
          {writable ? (
            <InputArea />
          ) : (
            <div className="bg-gray-400 inline-block h-10 rounded-full opacity-20 backdrop-blur animate-pulse w-full" />
          )}
        </div>
      </Transition>
    </>
  )
}

export default ChatRoom
