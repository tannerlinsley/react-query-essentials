import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import axios from 'axios'

export default function App() {
  return (
    <div>
      <Count />
      <Pokemon />
      <ReactQueryDevtools />
    </div>
  )
}

function usePokemon() {
  return useQuery('pokemons', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })
}

function Count() {
  const queryInfo = usePokemon()

  return <h3>You are looking at {queryInfo.data?.length} pokemon</h3>
}

function Pokemon() {
  const queryInfo = usePokemon()

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
