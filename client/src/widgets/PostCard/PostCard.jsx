import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Share2, MoreVertical, Trash2 } from 'lucide-react'
import { useAuthStore } from '@core/store/authStore'
import { formatDate, getRelativeTime, getInitials } from '@core/utils/helpers'
import { postService } from '@data/services/postService'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import './PostCard.css'

const PostCard = ({ post, onUpdate }) => {
  // Safety check: Agar post undefined hai to kuch mat render karo (Crash fix)
  if (!post) return null

  const { user } = useAuthStore()
  // Fix: Check if likes array includes user ID safely
  const [isLiked, setIsLiked] = useState(
    (post.likes || post.isLikedBy || []).includes(user?._id)
  )
  const [likesCount, setLikesCount] = useState(post.likesCount || (post.likes || []).length || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  // Menu ke bahar click karne par menu band karne ke liye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    try {
      await postService.deletePost(post._id)
      toast.success('Post deleted')
      if (onUpdate) onUpdate()
    } catch (error) {
      toast.error(error.message || 'Failed to delete post')
    }
  }

  const handleLike = async () => {
    if (isLoading) return
    
    // Optimistic Update: UI ko pehle update karo taaki fast lage
    const prevLiked = isLiked
    const prevCount = likesCount

    setIsLoading(true)
    setIsLiked(!prevLiked)
    setLikesCount(prev => prevLiked ? prev - 1 : prev + 1)

    try {
      if (prevLiked) {
        await postService.unlikePost(post._id)
      } else {
        await postService.likePost(post._id)
      }
      setIsLoading(false)
    } catch (error) {
      // Agar API fail ho jaye to wapas purana state set karo
      setIsLiked(prevLiked)
      setLikesCount(prevCount)
      setIsLoading(false)
      console.error('Like error:', error)
      toast.error(error.response?.data?.message || 'Failed to update like')
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
        
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button 
            className="post-card-more" 
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={18} />
          </button>

          {showMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              background: 'white',
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '4px',
              zIndex: 10,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              minWidth: '120px'
            }}>
              {user?._id === (post.author?._id || post.author) ? (
                <button
                  onClick={handleDelete}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              ) : (
                <div style={{ padding: '8px', fontSize: '12px', color: '#666' }}>No actions</div>
              )}
            </div>
          )}
        </div>
      </div>

      <Link to={`/posts/${post._id}`} className="post-card-content">
        {post.title && <h3 style={{ marginBottom: '8px', fontSize: '1.1rem', fontWeight: 600 }}>{post.title}</h3>}
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
