import { User } from '../models/User.js'
import { Post } from '../models/Post.js'
import { Reel } from '../models/Reel.js'

// GET /api/leaders/me/stats
export const getLeaderStats = async (req, res) => {
  try {
    const userId = req.user._id
    const [followersCount, postsCount, reelsCount] = await Promise.all([
      User.countDocuments({ following: userId }),
      Post.countDocuments({ author: userId }),
      Reel.countDocuments({ author: userId }),
    ])

    res.status(200).json({
      success: true,
      stats: {
        followersCount,
        postsCount,
        reelsCount,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// GET /api/leaders/me/followers
export const getLeaderFollowers = async (req, res) => {
  try {
    const leader = await User.findById(req.user._id).populate('followers', 'name username avatar faith')
    if (!leader) return res.status(404).json({ success: false, message: 'Leader not found' })

    res.status(200).json({ success: true, followers: leader.followers || [] })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// GET /api/leaders/me/content
export const getLeaderContent = async (req, res) => {
  try {
    const [posts, reels] = await Promise.all([
      Post.find({ author: req.user._id })
        .populate('author', 'name username avatar faith role')
        .sort({ createdAt: -1 }),
      Reel.find({ author: req.user._id })
        .populate('author', 'name username avatar faith role')
        .sort({ createdAt: -1 }),
    ])

    res.status(200).json({ success: true, posts, reels })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}
