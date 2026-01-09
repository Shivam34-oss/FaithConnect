/**
 * Comment Model
 */
export class Comment {
  constructor(data = {}) {
    this._id = data._id || null
    this.author = data.author || null
    this.content = data.content || ''
    this.post = data.post || null
    this.likes = data.likes || []
    this.replies = data.replies || []
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  get likesCount() {
    return this.likes?.length || 0
  }

  get repliesCount() {
    return this.replies?.length || 0
  }

  isLikedBy(userId) {
    return this.likes?.some((id) => id.toString() === userId.toString())
  }

  toJSON() {
    return {
      _id: this._id,
      author: this.author,
      content: this.content,
      post: this.post,
      likes: this.likes,
      replies: this.replies,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
