import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

function Posts({ setPostId }) {
  const postsQuery = useQuery('posts', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data)
  })

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? '...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map(post => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function Post({ postId, setPostId }) {
  const postQuery = useQuery(['post', postId], async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.data)
  })

  return (
    <div>
      <a onClick={() => setPostId(-1)} href="#">
        Back
      </a>
      <br />
      <br />
      {postQuery.isLoading ? (
        'Loading...'
      ) : (
        <>
          {postQuery.data.title}
          <br />
          <br />
          {postQuery.isFetching ? 'Updating...' : null}
        </>
      )}
    </div>
  )
  //
}

export default function App() {
  const [postId, setPostId] = React.useState(-1)

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools />
    </div>
  )
}
