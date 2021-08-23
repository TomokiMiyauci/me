import { onCreate } from '@/firestore/users/fcm/on_create'
import { onDelete } from '@/firestore/users/fcm/on_delete'

export const fcm = {
  onCreate,
  onDelete
}
