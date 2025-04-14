import React from 'react'
import PostForm from '../src/components/PostForm'
import { useParams } from 'react-router-dom'
import databaseService from '../src/appwrite/database'
import { useNavigate } from 'react-router-dom'

function EditPost() {

    const [post, setPost] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {

        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post)
            }).catch((error) => setError(error)).finally(() => setLoading(false))
        } else {
            navigate ('/')
        }

    }, [slug, navigate])
  if (post) return  (
    <PostForm post={post} />
  ) 
}

export default EditPost