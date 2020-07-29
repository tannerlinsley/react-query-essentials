import React from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchPosts = async () => {
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data.slice(0, 10))
}

export const getServerSideProps = async () => {
  const posts = await fetchPosts()

  return {
    props: {
      posts,
    },
  }
}

export default function Posts({ posts }) {
  const postsQuery = useQuery('posts', fetchPosts, {
    initialData: posts,
    initialStale: true,
  })

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
              <ul>
                {postsQuery.data.map((post) => (
                  <Link href="/[postId]" as={`/${post.id}`} key={post.id}>
                    <a>
                      <li key={post.id}>{post.title}</li>
                    </a>
                  </Link>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
