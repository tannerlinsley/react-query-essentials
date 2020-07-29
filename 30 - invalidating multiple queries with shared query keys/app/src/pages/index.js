import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function App() {
  return (
    <div>
      <button onClick={() => queryCache.invalidateQueries('random')}>
        Invalidate Random Number
      </button>
      <button
        onClick={() => queryCache.invalidateQueries(['random', 'A'])}
      >
        Invalidate A
      </button>
      <button
        onClick={() => queryCache.invalidateQueries(['random', 'B'])}
      >
        Invalidate B
      </button>
      <button
        onClick={() => queryCache.invalidateQueries(['random', 'C'])}
      >
        Invalidate C
      </button>
      <RandomNumber subKey="A" />
      <RandomNumber subKey="B" />
      <RandomNumber subKey="C" />
    </div>
  )
}

function RandomNumber({ subKey }) {
  const randomQuery = useQuery(
    ['random', subKey],
    async () => {
      return axios.get('/api/random').then(res => res.data)
    },
    {
      staleTime: Infinity,
    }
  )

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
    </div>
  )
}
