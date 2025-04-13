import React, { useEffect, useState } from 'react'
import databaseService from '../src/appwrite/database'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect (() => {

    databaseService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })

  }, [])

  if (posts.length === 0) {
    return <h1>Login to view posts</h1>
  }

  return (
    <div>Home</div>
  )
}

export default Home