import type { FieldValue, DocumentReference } from 'firebase/firestore'
import type { UserInfo } from '@/types/user'

type MessageData<T extends FieldValue = FieldValue> = {
  createdAt: T
  type: string
  value: string
  userRef: DocumentReference
  user: UserInfo
}

type Message = Pick<MessageData, 'type' | 'value' | 'user'> & {
  id: string
  createdAt: Date
}

export type { Message, MessageData }
