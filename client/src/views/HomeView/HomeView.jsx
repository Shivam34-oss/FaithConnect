import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { feedService } from '@data/services/feedService'
import PostCard from '@widgets/PostCard/PostCard'
import ReelCard from '@widgets/ReelCard/ReelCard'
import Button from '@widgets/Button/Button'
import { Plus, Loader } from 'lucide-react'
import { toast } from 'react-toastify'
import './HomeView.css'
import { useNavigate } from 'react-router-dom'

const HomeView = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const limit = 10

  const {
    data: feedData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['feed', page],
    () => feedService.getExploreFeed({ page, limit }),
    {
      keepPreviousData: true,
    }
  )

  const feedItems = feedData?.feed || []
  // Backend pagination logic might need adjustment, assuming simple load more for now
  const hasMore = feedItems.length === limit

  if (error) {
    toast.error('Failed to load feed')
  }

  return (
    <div className="home-view" style={{ maxWidth: '600px', margin: '0 auto', padding: '16px 0' }}>
      <div className="home-header">
        <h1>Feed</h1>
        <Button onClick={() => navigate('/posts/create')}>
          <Plus size={18} />
          Create Post
        </Button>
      </div>

      <div className="home-content">
        {isLoading && feedItems.length === 0 ? (
          <div className="home-loading">
            <Loader className="spinner" size={32} />
            <p>Loading feed...</p>
          </div>
        ) : feedItems.length === 0 ? (
          <div className="home-empty">
            <p>No content yet. Be the first to share!</p>
          </div>
        ) : (
          <>
            <div className="home-posts">
              {feedItems.map((item, index) => {
                // Handle mixed feed types
                if (item.type === 'reel') {
                  return <ReelCard key={item.data._id || index} reel={item.data} />
                }
                return <PostCard key={item.data._id || index} post={item.data} onUpdate={refetch} />
              })}
            </div>
            {hasMore && (
              <div className="home-load-more">
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => prev + 1)}
                  loading={isLoading}
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomeView
