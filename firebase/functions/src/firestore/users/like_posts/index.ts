import { onCreate } from '@/firestore/users/like_posts/on_create'
import { onDelete } from '@/firestore/users/like_posts/on_delete'

export const likePosts = {
  onCreate,
  onDelete
}
