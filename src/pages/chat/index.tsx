import { Icon } from '@iconify/react/dist/offline'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import bxsMessageSquareDots from '@iconify/icons-bx/bxs-message-square-dots'
import { useFirestore } from '@/hooks/firebase/firestore'
import type { FC } from 'react'
import type { PageProps } from 'gatsby'
import type {
  PublicChatRoomData,
  PublicChatRoom
} from '@/components/Chat/types'
import type { DocumentReference } from 'firebase/firestore'
import { useUser } from '@/hooks/user'
import Room from '@/components/Chat/Room/Room'

const Main: FC = () => {
  const [chatRoom, changeChatRoom] = useState<Partial<PublicChatRoom>>({})
  const { uid } = useUser()
  const firestore = useFirestore()

  useEffect(() => {
    if (!firestore || !uid) return
    getDoc(
      doc(
        firestore,
        'publicChatRooms',
        '0'
      ) as DocumentReference<PublicChatRoomData>
    ).then(async (snapshot) => {
      if (!snapshot.exists()) return

      const { createdAt, createdAtOrigin, ...rest } = snapshot.data()
      const documentData = await getDoc(
        doc(firestore, 'users', uid, 'relatedPublicRooms', '0')
      )

      const unreadMessages = documentData.get('unreadMessages')

      changeChatRoom({
        ...rest,
        createdAt: createdAt.toDate(),
        createdAtOrigin: createdAtOrigin.toDate(),
        unreadMessages: unreadMessages ? unreadMessages.length : 0
      })
    })
  }, [])

  return (
    <div className="w-full h-full flex space-x-4">
      <aside className="md:w-72 flex-1 md:flex-none">
        <div className="px-8 text-sm text-gray-400">Public</div>
        <ul>
          <li className="dark:hover:bg-blue-gray-800 hover:bg-gray-100 transition-colors duration-300">
            <Link to="/chat/public/fff" className="flex p-2 space-x-3">
              <Room
                title={'Public Chat'}
                message={chatRoom.value}
                date={chatRoom.createdAtOrigin}
                icon={() => import('@iconify/icons-bx/bx-world')}
              />
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
