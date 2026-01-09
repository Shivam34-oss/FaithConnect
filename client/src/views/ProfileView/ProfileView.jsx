import { useQuery } from 'react-query'
import { useAuthStore } from '@core/store/authStore'
import { userService } from '@data/services/userService'
import { getInitials } from '@core/utils/helpers'
import Button from '@widgets/Button/Button'
import { UserPlus, UserMinus, Settings, Edit } from 'lucide-react'
import './ProfileView.css'

const ProfileView = () => {
  const { user } = useAuthStore()
  const userId = user?._id

  const { data: profileData, isLoading } = useQuery(
    ['user', userId],
    () => userService.getUserById(userId),
    {
      enabled: !!userId,
    }
  )

  const profile = profileData || user
  const isOwnProfile = true

  return (
    <div className="profile-view">
      {isLoading ? (
        <div className="profile-loading">Loading...</div>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-cover">
              <div className="profile-avatar-large">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={profile.name} />
                ) : (
                  <div className="profile-avatar-placeholder-large">
                    {getInitials(profile?.name || 'U')}
                  </div>
                )}
              </div>
            </div>
            <div className="profile-info">
              <h1>{profile?.name || 'User'}</h1>
              <p className="profile-username">@{profile?.username}</p>
              {profile?.bio && <p className="profile-bio">{profile.bio}</p>}
              {profile?.faith && (
                <p className="profile-faith">Faith: {profile.faith}</p>
              )}
              {profile?.location && (
                <p className="profile-location">📍 {profile.location}</p>
              )}
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="profile-stat-value">
                    {profile?.postsCount || 0}
                  </span>
                  <span className="profile-stat-label">Posts</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-value">
                    {profile?.followersCount || 0}
                  </span>
                  <span className="profile-stat-label">Followers</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-value">
                    {profile?.followingCount || 0}
                  </span>
                  <span className="profile-stat-label">Following</span>
                </div>
              </div>
              <div className="profile-actions">
                {isOwnProfile ? (
                  <>
                    <Button variant="outline">
                      <Edit size={18} />
                      Edit Profile
                    </Button>
                    <Button variant="secondary">
                      <Settings size={18} />
                      Settings
                    </Button>
                  </>
                ) : (
                  <Button>
                    <UserPlus size={18} />
                    Follow
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="profile-content">
            <h2>Posts</h2>
            <div className="profile-posts">
              {/* Posts will be rendered here */}
              <p className="profile-empty">No posts yet</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileView
