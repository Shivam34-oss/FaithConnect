import { useQuery } from 'react-query'
import { communityService } from '@data/services/communityService'
import Button from '@widgets/Button/Button'
import { Users, Plus, Search } from 'lucide-react'
import './CommunityView.css'

const CommunityView = () => {
  const { data: communitiesData, isLoading } = useQuery(
    'communities',
    () => communityService.getCommunities()
  )

  const communities = communitiesData?.communities || []

  return (
    <div className="community-view">
      <div className="community-header">
        <div>
          <h1>Communities</h1>
          <p>Join faith communities and connect with like-minded believers</p>
        </div>
        <Button>
          <Plus size={18} />
          Create Community
        </Button>
      </div>

      <div className="community-search">
        <div className="community-search-wrapper">
          <Search size={20} className="community-search-icon" />
          <input
            type="text"
            placeholder="Search communities..."
            className="community-search-input"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="community-loading">Loading communities...</div>
      ) : communities.length === 0 ? (
        <div className="community-empty">
          <Users size={48} />
          <p>No communities found</p>
          <Button>Create First Community</Button>
        </div>
      ) : (
        <div className="community-grid">
          {communities.map((community) => (
            <div key={community._id} className="community-card">
              {community.image ? (
                <img
                  src={community.image}
                  alt={community.name}
                  className="community-card-image"
                />
              ) : (
                <div className="community-card-image-placeholder">
                  <Users size={32} />
                </div>
              )}
              <div className="community-card-content">
                <h3>{community.name}</h3>
                <p className="community-card-description">
                  {community.description || 'No description'}
                </p>
                <div className="community-card-meta">
                  <span className="community-card-faith">{community.faith}</span>
                  <span className="community-card-members">
                    {community.membersCount || 0} members
                  </span>
                </div>
                <Button variant="outline" fullWidth className="community-card-join">
                  {community.isMember ? 'Joined' : 'Join Community'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommunityView
