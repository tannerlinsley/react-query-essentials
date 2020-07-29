import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery, useMutation, queryCache } from 'react-query'
import axios from 'axios'

//

import PostForm from '../components/PostForm'

export default function Post() {
  const {
    query: { postId },
  } = useRouter()

  const postQuery = useQuery(['post', postId], () =>
    axios.get(`/api/posts/${postId}`).then((res) => res.data)
  )

  const [savePost, savePostInfo] = useMutation(
    (values) =>
      axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        queryCache.cancelQueries(['post', String(values.id)])

        const oldPost = queryCache.getQueryData(['post', String(values.id)])

        queryCache.setQueryData(['post', String(values.id)], values)

        return () =>
          queryCache.setQueryData(['post', String(values.id)], oldPost)
      },
      onError: (error, values, rollback) => {
        if (rollback) {
          rollback()
        }
      },
      onSuccess: (data, values) => {
        queryCache.setQueryData(['post', String(values.id)], data)
      },
      onSettled: (data, error, values) => {
        queryCache.invalidateQueries(['post', String(values.id)])
      },
    }
  )

  return (
    <>
      {postQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h3>
            <Link href="/[postId]" as={`/${postQuery.data.id}`}>
              <a>
                {postQuery.data.title} {postQuery.isFetching ? '...' : null}
              </a>
            </Link>
          </h3>
          <p>
            <small>Post ID: {postQuery.data.id}</small>
          </p>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={savePost}
            submitText={
              savePostInfo.isLoading
                ? 'Saving...'
                : savePostInfo.isError
                ? 'Error!'
                : savePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />
        </div>
      )}
    </>
  )
}
