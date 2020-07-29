import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

function Posts({ setPostId }) {
  const postsQuery = useQuery('posts', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data.slice(0, 10))
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
                <li
                  key={post.id}
                  onMouseEnter={() => {
                    queryCache.prefetchQuery(
                      ['post', post.id],
                      () => fetchPost(post.id),
                      null,
                      {
                        force: true,
                      }
                    )
                  }}
                >
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

async function fetchPost(postId) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.data)
}

function Post({ postId, setPostId }) {
  const postQuery = useQuery(['post', postId], () => fetchPost(postId), {
    staleTime: 60 * 1000,
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
