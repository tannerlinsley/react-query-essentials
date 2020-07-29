import React from 'react'
import { useQuery } from 'react-query'

export default function App() {
  const queryInfo = useQuery('pokemon', () =>
    fetch('https://pokeapi.co/api/v2/pokemon').then(res => res.json())
  )

  return (
    <div>
      {queryInfo.data?.results.map(result => {
        return <div key={result.id}>{result.name}</div>
      })}
    </div>
  )
}
