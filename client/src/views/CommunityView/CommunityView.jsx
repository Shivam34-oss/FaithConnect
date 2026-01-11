import { useState } from 'react'
import { useQuery } from 'react-query'
import { useAuthStore } from '@core/store/authStore'
import { communityService } from '@data/services/communityService'
import Button from '@widgets/Button/Button'
import Input from '@widgets/Input/Input'
import { Users, Plus, Search, X, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import './CommunityView.css'

const CommunityView = () => {
  const { user } = useAuthStore()
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    faith: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: communitiesData, isLoading, refetch } = useQuery(
    ['communities', searchQuery],
    () => searchQuery 
      ? communityService.searchCommunities(searchQuery)
      : communityService.getCommunities()
  )

  const communities = communitiesData?.communities || []

  const handleCreate = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await communityService.createCommunity(formData)
      toast.success('Community created successfully!')
      setShowModal(false)
      setFormData({ name: '', description: '', faith: '' })
      refetch()
    } catch (err) {
      toast.error(err.message || 'Failed to create community')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this community?')) return
    try {
      await communityService.deleteCommunity(id)
      toast.success('Community deleted')
      refetch()
    } catch (err) {
      toast.error(err.message || 'Failed to delete community')
    }
  }

  return (
    <div className="community-view">
      <div className="community-header">
        <div>
          <h1>Communities</h1>
          <p>Join faith communities and connect with like-minded believers</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="community-loading">Loading communities...</div>
      ) : communities.length === 0 ? (
        <div className="community-empty">
          <Users size={48} />
          <p>{searchQuery ? 'No communities found' : 'No communities yet'}</p>
          <Button onClick={() => setShowModal(true)}>Create First Community</Button>
        </div>
      ) : (
        <div className="community-grid">
          {communities.map((community) => (
            <div key={community._id} className="community-card" style={{ position: 'relative' }}>
             
              {user?._id && (community.creator?._id || community.creator) && 
                String(user._id) === String(community.creator?._id || community.creator) && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete(community._id)
                  }}
                  style={{
                    position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                    background: 'white', border: 'none', borderRadius: '50%',
                    width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    color: '#ef4444'
                  }}
                  title="Delete Community"
                >
                  <Trash2 size={16} />
                </button>
              )}
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

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '24px', borderRadius: '12px',
            width: '90%', maxWidth: '500px', position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', right: '16px', top: '16px', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            
            <h2 style={{ marginBottom: '20px' }}>Create Community</h2>
            
            <form onSubmit={handleCreate}>
              <Input
                label="Community Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                fullWidth
                required
              />
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px', fontFamily: 'inherit' }}
                  required
                />
              </div>
              <Input
                label="Faith / Denomination"
                value={formData.faith}
                onChange={(e) => setFormData({...formData, faith: e.target.value})}
                fullWidth
              />
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <Button variant="ghost" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" loading={isSubmitting}>Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunityView
