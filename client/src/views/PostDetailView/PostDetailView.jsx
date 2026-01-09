import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { postService } from '@data/services/postService'
import PostCard from '@widgets/PostCard/PostCard'
import { Loader } from 'lucide-react'
import './PostDetailView.css'

const PostDetailView = () => {
  const { id } = useParams()
  const { data: post, isLoading, error } = useQuery(
    ['post', id],
    () => postService.getPostById(id),
    {
      enabled: !!id,
    }
  )

  if (isLoading) {
    return (
      <div className="post-detail-loading">
        <Loader className="spinner" size={32} />
        <p>Loading post...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="post-detail-error">
        <p>Post not found</p>
      </div>
    )
  }

  return (
    <div className="post-detail-view">
      <div className="post-detail-container">
        <PostCard post={post} />
        {/* Comments section can be added here */}
      </div>
    </div>
  )
}

export default PostDetailView
