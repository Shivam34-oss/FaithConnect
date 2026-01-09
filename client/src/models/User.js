/**
 * User Model
 */
export class User {
  constructor(data = {}) {
    this._id = data._id || null
    this.name = data.name || ''
    this.email = data.email || ''
    this.username = data.username || ''
    this.avatar = data.avatar || null
    this.bio = data.bio || ''
    this.faith = data.faith || ''
    this.location = data.location || ''
    this.followers = data.followers || []
    this.following = data.following || []
    this.posts = data.posts || []
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  get followersCount() {
    return this.followers?.length || 0
  }

  get followingCount() {
    return this.following?.length || 0
  }

  get postsCount() {
    return this.posts?.length || 0
  }

  isFollowing(userId) {
    return this.following?.some((id) => id.toString() === userId.toString())
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      username: this.username,
      avatar: this.avatar,
      bio: this.bio,
      faith: this.faith,
      location: this.location,
      followers: this.followers,
      following: this.following,
      posts: this.posts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
