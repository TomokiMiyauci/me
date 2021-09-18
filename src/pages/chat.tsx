import bxWorld from '@iconify/icons-bx/bx-world'
import { Icon } from '@iconify/react/dist/offline'
import { Link } from 'gatsby'
import { useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import Timestamp from '@/components/Chat/Timestamp'
import bxsMessageSquareDots from '@iconify/icons-bx/bxs-message-square-dots'
import { useSafeFirestoreEffect } from '@/hooks/firebase/firestore'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import type {
  PublicChatRoomData,
  PublicChatRoom
} from '@/components/Chat/types'
import type { DocumentReference } from 'firebase/firestore'

const Main: FC = () => {
  const [chatRoom, changeChatRoom] = useState<Partial<PublicChatRoom>>({})

  useSafeFirestoreEffect((firestore) => {
    getDoc(
      doc(
        firestore,
        'publicChatRooms',
        '0'
      ) as DocumentReference<PublicChatRoomData>
    ).then((snapshot) => {
      if (!snapshot.exists()) return

      const { createdAt, createdAtOrigin, ...rest } = snapshot.data()

      changeChatRoom({
        ...rest,
        createdAt: createdAt.toDate(),
        createdAtOrigin: createdAtOrigin.toDate()
      })
    })
  }, [])

  return (
    <div className="w-full h-full flex space-x-4">
      <aside className="md:w-72 flex-1 md:flex-none">
        <div className="mb-2 px-4 text-sm text-gray-400">Public</div>
        <ul>
          <li className="dark:hover:bg-blue-gray-800 hover:bg-gray-100 transition-colors duration-300">
            <Link to="/chat/public/" className="flex p-2 space-x-3">
              <div className="flex-none">
                <Icon
                  className="w-12 h-12 bg-gray-400 bg-opacity-20 p-1 rounded-md text-accent"
                  icon={bxWorld}
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="flex leading-tight items-center justify-between">
                  <span className="font-semibold flex-1">Public Chat</span>
                  {chatRoom.createdAtOrigin && (
                    <Timestamp date={chatRoom.createdAtOrigin} />
                  )}
                </h3>
                <div className="text-gray-400 text-sm inline-block max-w-[70vw] line-clamp-2 font-light break-words whitespace-pre-wrap leading-none">
                  {chatRoom.value ?? 'Public messaging room'}
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </aside>

      <section className="flex-1 hidden md:grid container mx-auto place-items-center">
        <div className="flex flex-col justify-between items-center space-y-2">
          <Icon
            className="w-24 h-24 bg-gray-400 text-accent bg-opacity-20 p-2 rounded-md"
            icon={bxsMessageSquareDots}
          />
          <div className="text-center text-xl text-gray-400">
            Select chat room
          </div>
        </div>
      </section>
    </div>
  )
}

const Index: FC<PageProps> = () => {
  return <Main />
}

export default Index
