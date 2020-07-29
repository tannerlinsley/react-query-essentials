import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import axios from 'axios'
function Pokemon() {
  const queryInfo = useQuery(
    'pokemon',
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.data.results)
    },
    {
      cacheTime: Infinity,
    }
  )

  return queryInfo.isLoading ? (
    'Loading...'
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}

export default function App() {
  const [show, toggle] = React.useReducer(d => !d, true)
  return (
    <div>
      <button onClick={() => toggle()}>{show ? 'Hide' : 'Show'}</button>
      <br />
      <br />
      {show ? <Pokemon /> : null}
      <ReactQueryDevtools />
    </div>
  )
}
