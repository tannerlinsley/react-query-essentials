import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function App() {
  const queryInfo = useQuery('pokemon', () =>
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  )

  return (
    <div>
      {queryInfo.data?.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
