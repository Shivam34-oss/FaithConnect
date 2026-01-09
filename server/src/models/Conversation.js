import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    lastMessage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

conversationSchema.index({ participants: 1 })
conversationSchema.index({ updatedAt: -1 })

export const Conversation = mongoose.model('Conversation', conversationSchema)
