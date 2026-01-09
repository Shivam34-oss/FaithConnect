import { Post } from '../models/Post.js'
import { Reel } from '../models/Reel.js'

const mergeAndSort = (posts, reels) => {
  const combined = [
    ...posts.map((p) => ({ type: 'post', data: p, createdAt: p.createdAt })),
    ...reels.map((r) => ({ type: 'reel', data: r, createdAt: r.createdAt })),
  ]
  return combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// GET /api/feed/explore
export const getExploreFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const postsPromise = Post.find({ isPublic: true })
      .populate('author', 'name username avatar faith role')
      .populate('community', 'name image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const reelsPromise = Reel.find({ isPublic: true })
      .populate('author', 'name username avatar faith role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const [posts, reels] = await Promise.all([postsPromise, reelsPromise])
    const feed = mergeAndSort(posts, reels).slice(0, limit)

    res.status(200).json({ success: true, feed, pagination: { page, limit } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// GET /api/feed/following
export const getFollowingFeed = async (req, res) => {
  try {
    const followingIds = req.user.following || []
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const postsPromise = Post.find({ author: { $in: followingIds } })
      .populate('author', 'name username avatar faith role')
      .populate('community', 'name image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const reelsPromise = Reel.find({ author: { $in: followingIds } })
      .populate('author', 'name username avatar faith role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const [posts, reels] = await Promise.all([postsPromise, reelsPromise])
    const feed = mergeAndSort(posts, reels).slice(0, limit)

    res.status(200).json({ success: true, feed, pagination: { page, limit } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}
