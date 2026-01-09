import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react'
import { useAuthStore } from '@core/store/authStore'
import { formatDate, getRelativeTime, getInitials } from '@core/utils/helpers'
import { postService } from '@data/services/postService'
import { useState } from 'react'
import { toast } from 'react-toastify'
import './PostCard.css'

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuthStore()
  const [isLiked, setIsLiked] = useState(post.isLikedBy?.(user?._id) || false)
  const [likesCount, setLikesCount] = useState(post.likesCount || 0)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      if (isLiked) {
        await postService.unlikePost(post._id)
        setIsLiked(false)
        setLikesCount((prev) => prev - 1)
      } else {
        await postService.likePost(post._id)
        setIsLiked(true)
        setLikesCount((prev) => prev + 1)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to like post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="post-card">
      <div className="post-card-header">
        <Link
          to={`/profile/${post.author?._id || post.author}`}
          className="post-card-author"
        >
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="post-card-avatar"
            />
          ) : (
            <div className="post-card-avatar-placeholder">
              {getInitials(post.author?.name || 'U')}
            </div>
          )}
          <div className="post-card-author-info">
            <div className="post-card-author-name">
              {post.author?.name || 'Unknown User'}
            </div>
            <div className="post-card-time">
              {getRelativeTime(post.createdAt)}
            </div>
          </div>
        </Link>
        <button className="post-card-more">
          <MoreVertical size={18} />
        </button>
      </div>

      <Link to={`/posts/${post._id}`} className="post-card-content">
        <p>{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div className="post-card-images">
            {post.images.slice(0, 3).map((image, index) => (
              <img key={index} src={image} alt={`Post ${index + 1}`} />
            ))}
          </div>
        )}
      </Link>

      <div className="post-card-footer">
        <button
          className={`post-card-action ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={isLoading}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{likesCount}</span>
        </button>
        <Link to={`/posts/${post._id}`} className="post-card-action">
          <MessageCircle size={18} />
          <span>{post.commentsCount || 0}</span>
        </Link>
        <button className="post-card-action">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>
    </article>
  )
}

export default PostCard
