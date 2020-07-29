import axios from 'axios'
import { useQuery, queryCache } from 'react-query'

export const fetchPost = (_, postId) =>
  axios.get(`/api/posts/${postId}`).then((res) => res.data)

export default function usePost(postId) {
  return useQuery(['posts', postId], fetchPost, {
    initialData: () =>
      queryCache.getQueryData('posts')?.find((d) => d.id == postId),
    initialStale: true,
  })
}
