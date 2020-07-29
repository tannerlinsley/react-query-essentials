import React from 'react'
import axios from 'axios'
import { usePaginatedQuery } from 'react-query'

export default function Posts() {
  const [page, setPage] = React.useState(0)

  const postsQuery = usePaginatedQuery(['posts', { page }], () =>
    axios
      .get('/api/posts', {
        params: {
          pageSize: 10,
          pageOffset: page,
        },
      })
      .then((res) => res.data)
  )

  return (
    <div>
      {postsQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
          <ul>
            {postsQuery.resolvedData.items.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <br />
        </>
      )}
      <button onClick={() => setPage((old) => old - 1)} disabled={page === 0}>
        Previous
      </button>{' '}
      <button
        onClick={() => setPage((old) => old + 1)}
        disabled={!postsQuery.latestData?.nextPageOffset}
      >
        Next
      </button>{' '}
      <span>
        Current Page: {page + 1} {postsQuery.isFetching ? '...' : ''}
      </span>
    </div>
  )
}
