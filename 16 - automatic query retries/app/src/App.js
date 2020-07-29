import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import axios from 'axios'

export default function App() {
  const [pokemon, setPokemon] = React.useState('')
  return (
    <div>
      <input value={pokemon} onChange={e => setPokemon(e.target.value)} />
      <PokemonSearch pokemon={pokemon} />
      <ReactQueryDevtools />
    </div>
  )
}

function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(
    ['pokemon', pokemon],
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.data)
    },
    {
      retry: 2,
      retryDelay: 1000,
      enabled: pokemon,
    }
  )

  return queryInfo.isLoading ? (
    'Loading...'
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
      ) : (
        'Pokemon not found.'
      )}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}
