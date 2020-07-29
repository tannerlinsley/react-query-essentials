import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import axios from 'axios'

//

const fetchPost = async (id) => {
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .get('https://jsonplaceholder.typicode.com/posts/' + id)
    .then((res) => res.data)
}

export const getServerSideProps = async ({ params: { postId } }) => {
  const post = await fetchPost(postId)

  return {
    props: {
      post,
    },
  }
}

export default function Post({ post }) {
  const {
    query: { postId },
  } = useRouter()

  const postQuery = useQuery(['post', postId], () => fetchPost(postId), {
    initialData: post,
    initialStale: true,
  })

  return (
    <>
      {postQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <Link href="/">
            <a>Back</a>
          </Link>
          <h3>
            {postQuery.data.title} {postQuery.isFetching ? '...' : null}
          </h3>
          <p>
            <small>Post ID: {postQuery.data.id}</small>
          </p>
          <p>{postQuery.data.body}</p>
        </div>
      )}
    </>
  )
}
