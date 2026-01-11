import mongoose from 'mongoose'

const chatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    type: {
      type: String,
      enum: ['user', 'bot'],
      default: 'user'
    },
    intent: String,
    confidence: Number
  },
  {
    timestamps: true
  }
)

chatMessageSchema.index({ userId: 1, createdAt: -1 })
chatMessageSchema.index({ content: 'text' })

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema)
