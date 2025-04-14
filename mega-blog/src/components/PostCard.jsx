import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/storage'
import parse from 'html-react-parser'
import Container from './Container/Container'

function PostCard({$id, title, featuredImage, content}) {
  return (
  <Container>
    <Link to={`/post/${$id}`}>

        <img src={storageService.fileView(featuredImage)} alt={title} className='w-1/3 h-auto rounded-xl' />

        <div>{title}</div>

        <div>{parse(content)}</div>


    </Link>
    </Container>
  )
}

export default PostCard