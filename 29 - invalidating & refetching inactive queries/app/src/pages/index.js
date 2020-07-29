import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function App() {
  const [show, toggle] = React.useReducer(d => !d, true)
  return (
    <div>
      <button onClick={toggle}>Toggle Random</button>
      <button
        onClick={() =>
          queryCache.invalidateQueries('random', {
            refetchInactive: true,
          })
        }
      >
        Invalidate Random Number
      </button>
      {show ? <RandomNumber /> : null}
    </div>
  )
}

function RandomNumber() {
  const randomQuery = useQuery(
    'random',
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
