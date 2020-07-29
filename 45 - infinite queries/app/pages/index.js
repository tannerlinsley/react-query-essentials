import React from 'react'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'

const fetchPosts = (_, page = 0) =>
  axios
    .get('/api/posts', {
      params: {
        pageOffset: page,
        pageSize: 10,
      },
    })
    .then((res) => res.data)

export default function Posts() {
  const postsQuery = useInfiniteQuery('posts', fetchPosts, {
    getFetchMore: (lastPage) => lastPage.nextPageOffset,
  })

  return (
    <div>
      {postsQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
          <ul>
            {postsQuery.data.map((page, index) => {
              return (
                <React.Fragment key={index}>
                  {page.items.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </React.Fragment>
              )
            })}
          </ul>
          <br />
        </>
      )}
      <button
        onClick={() => postsQuery.fetchMore()}
        disabled={!postsQuery.canFetchMore}
      >
        Fetch More
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
