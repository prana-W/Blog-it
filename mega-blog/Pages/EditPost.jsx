import React from 'react'
import PostForm from '../src/components/PostForm'
import { useParams } from 'react-router-dom'
import databaseService from '../src/appwrite/database'

function EditPost({post}) {
    const [post, setPost] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const {slug} = useParams()

    React.useEffect(() => {

        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post)
            }).catch((error) => setError(error)).finally(() => setLoading(false))
        } else {
            navigate ('/')
        }

    }, [slug, navigate])
  return post ? (
    <PostForm post={post} />
  ) : null;
}

export default EditPost