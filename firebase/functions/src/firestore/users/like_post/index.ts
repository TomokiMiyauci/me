import { onCreate } from '@/firestore/users/like_post/on_create'
import { onDelete } from '@/firestore/users/like_post/on_delete'

export const likePost = {
  onCreate,
  onDelete
}
