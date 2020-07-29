import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useDeletePost() {
  return useMutation(
    (postId) => axios.delete(`/api/posts/${postId}`).then((res) => res.data),
    {
      onSuccess: (data, variables) => {
        queryCache.invalidateQueries('posts')
      },
    }
  )
}
