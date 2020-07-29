import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import axios from 'axios'

export default function App() {
  return (
    <div>
      <Pokemon queryKey="pokemon1" />
      <Pokemon queryKey="pokemon1" />
      <ReactQueryDevtools />
    </div>
  )
}

function Pokemon({ queryKey }) {
  const queryInfo = useQuery(queryKey, async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })

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
