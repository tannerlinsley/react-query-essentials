import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function Posts() {
  const randomQuery = useQuery('random', async () => {
    return axios.get('/api/random').then(res => res.data)
  })

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
      <div>
        <button onClick={() => queryCache.invalidateQueries('random')}>
          Invalidate Random Number
        </button>
      </div>
    </div>
  )
}
