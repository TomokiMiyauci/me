import type {
  FieldValue,
  DocumentReference,
  Timestamp
} from 'firebase/firestore'
import type { UserInfo } from '@/types/user'

type MessageType = 'text'
type MessageData<T extends FieldValue = FieldValue> = {
  createdAt: T
  type: MessageType
  value: string
  userRef: DocumentReference
  user: UserInfo
}

type Message = Pick<MessageData, 'type' | 'value' | 'user'> & {
  id: string
  createdAt: Date
}

type PublicChatRoomData<T extends Record<PropertyKey, any> = Timestamp> = {
  createdAt: T
  createdAtOrigin: T
  value: string
  user: UserInfo
}

type PublicChatRoom = PublicChatRoomData<Date>

export type { Message, MessageData, PublicChatRoom, PublicChatRoomData }
