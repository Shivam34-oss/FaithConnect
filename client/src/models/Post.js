/**
 * Post Model
 */
export class Post {
  constructor(data = {}) {
    this._id = data._id || null
    this.author = data.author || null
    this.content = data.content || ''
    this.images = data.images || []
    this.likes = data.likes || []
    this.comments = data.comments || []
    this.community = data.community || null
    this.tags = data.tags || []
    this.isPublic = data.isPublic !== undefined ? data.isPublic : true
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  get likesCount() {
    return this.likes?.length || 0
  }

  get commentsCount() {
    return this.comments?.length || 0
  }

  isLikedBy(userId) {
    return this.likes?.some((id) => id.toString() === userId.toString())
  }

  toJSON() {
    return {
      _id: this._id,
      author: this.author,
      content: this.content,
      images: this.images,
      likes: this.likes,
      comments: this.comments,
      community: this.community,
      tags: this.tags,
      isPublic: this.isPublic,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
