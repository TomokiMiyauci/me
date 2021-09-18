import InputArea from '@/components/Chat/InputArea'
import Loading from '@/components/Chat/Loading'
import MustSignin from '@/components/SignIn/MustSignin'
import { Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { Timestamp } from '@firebase/firestore/dist/lite'
import {
  useFirestore,
  useSafeFirestoreEffect
} from '@/hooks/firebase/firestore'
import { useUser } from '@/hooks/user'
import {
  collection,
  onSnapshot,
  limit,
  query,
  orderBy
} from 'firebase/firestore'
import { useStep } from '@/components/Chat/hooks'
import { useMemo, useRef } from 'react'
import type { Message, MessageData } from '@/components/Chat/types'
import type { CollectionReference } from 'firebase/firestore'
import type { FC } from 'react'

const Chat: FC = () => {
  const [messages, changeMessages] = useState<Message[]>([])
  const { uid } = useUser()

  useSafeFirestoreEffect((firestore) => {
    const col = collection(
      firestore,
      'publicChatRooms',
      '0',
      'messages'
    ) as CollectionReference<MessageData<Timestamp>>

    const q = query(col, orderBy('createdAt', 'desc'))

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
  }, [])

  const groupedMessage = useMemo(() => {
    const group = messages.reduce((acc, cur) => {
      const date = cur.createdAt.toDateString()

      acc = { [date]: [...(acc[date] ?? []), cur] }
      return acc
    }, {} as { [k in string]: Message[] })

    return group
  }, [messages])

  const ref = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    ref.current[0]?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <div className="flex-1 px-2 pb-1">
      {Object.entries(groupedMessage).map(([date, messages]) => {
        return (
          <section className="space-y-1 relative" key={date}>
            <div className="text-center sticky top-2">
              <span className="bg-gray-400 bg-opacity-20 rounded-full px-3 py-1">
                {date}
              </span>
            </div>
            <div className="flex flex-col-reverse">
              {messages.map(({ value, id, createdAt, user }, i) => {
                return (
                  <div
                    ref={(r) => (ref.current[i] = r)}
                    className="my-1.5 ml-2 space-y-1"
                    key={id}
                    data-id={i}
                  >
                    <div className="text-xs">
                      {user.displayName ?? 'Anonymous'}
                    </div>
                    <div className="space-x-2">
                      <div className="rounded-xl max-w-[80vw] inline-block bg-gray-400 break-words whitespace-pre-wrap bg-opacity-20 py-1 px-3">
                        {value}
                      </div>

                      <span className="align-bottom text-gray-400 text-xs">
                        {createdAt.toLocaleTimeString('ja', {
                          timeStyle: 'short'
                        })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

const useChat = () => {
  const { isAnonymous, isLoggedIn } = useUser()
  const firestore = useFirestore()

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
