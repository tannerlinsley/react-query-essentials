import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

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

const fetchPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const posts = await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)

  console.log('On success')

  return posts
}

function Posts({ setPostId }) {
  const [count, increment] = React.useReducer(d => d + 1, 0)

  const postsQuery = useQuery('posts', fetchPosts, {
    onSuccess: data => {
      increment()
    },
    onError: error => {},
    onSettled: (data, error) => {},
  })

  return (
    <div>
      <h1>
        Posts {postsQuery.isFetching ? '...' : null}
        {count}
      </h1>
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
