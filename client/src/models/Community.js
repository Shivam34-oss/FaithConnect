/**
 * Community Model
 */
export class Community {
  constructor(data = {}) {
    this._id = data._id || null
    this.name = data.name || ''
    this.description = data.description || ''
    this.image = data.image || null
    this.faith = data.faith || ''
    this.members = data.members || []
    this.admins = data.admins || []
    this.posts = data.posts || []
    this.isPrivate = data.isPrivate !== undefined ? data.isPrivate : false
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  get membersCount() {
    return this.members?.length || 0
  }

  get postsCount() {
    return this.posts?.length || 0
  }

  isMember(userId) {
    return this.members?.some((id) => id.toString() === userId.toString())
  }

  isAdmin(userId) {
    return this.admins?.some((id) => id.toString() === userId.toString())
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      image: this.image,
      faith: this.faith,
      members: this.members,
      admins: this.admins,
      posts: this.posts,
      isPrivate: this.isPrivate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
