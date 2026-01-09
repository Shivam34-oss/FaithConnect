import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [5000, 'Post content cannot exceed 5000 characters'],
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
      default: null,
    },
    tags: [
      {
        type: String,
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Index for better query performance
postSchema.index({ author: 1, createdAt: -1 })
postSchema.index({ community: 1, createdAt: -1 })

export const Post = mongoose.model('Post', postSchema)
