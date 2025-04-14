import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/storage'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/posts/${$id}`}>

        <img src={storageService.fileView(featuredImage)} alt={title} />

        <div>{title}</div>
    
    
    </Link>
  )
}

export default PostCard