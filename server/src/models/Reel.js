import mongoose from 'mongoose'

const reelSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    caption: {
      type: String,
      default: '',
      maxlength: [2000, 'Caption cannot exceed 2000 characters'],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    saves: [
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

reelSchema.index({ author: 1, createdAt: -1 })
reelSchema.index({ createdAt: -1 })

export const Reel = mongoose.model('Reel', reelSchema)
