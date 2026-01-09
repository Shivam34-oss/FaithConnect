import { Reel } from '../models/Reel.js'
import { Comment } from '../models/Comment.js'

// GET /api/reels
export const getReels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const reels = await Reel.find({ isPublic: true })
      .populate('author', 'name username avatar faith role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Reel.countDocuments({ isPublic: true })

    res.status(200).json({
      success: true,
      reels,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + reels.length < total,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// GET /api/reels/author/:id
export const getReelsByAuthor = async (req, res) => {
  try {
    const reels = await Reel.find({ author: req.params.id })
      .populate('author', 'name username avatar faith role')
      .sort({ createdAt: -1 })

    res.status(200).json({ success: true, reels })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// POST /api/reels
export const createReel = async (req, res) => {
  try {
    // Optional: enforce only leaders can create
    if (req.user.role !== 'leader') {
      return res.status(403).json({ success: false, message: 'Only leaders can create reels' })
    }

    const { videoUrl, caption, tags, isPublic } = req.body

    const reel = await Reel.create({
      author: req.user._id,
      videoUrl,
      caption,
      tags: tags || [],
      isPublic: isPublic !== undefined ? isPublic : true,
    })

    const populated = await Reel.findById(reel._id).populate('author', 'name username avatar faith role')

    res.status(201).json({ success: true, message: 'Reel created successfully', reel: populated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// POST /api/reels/:id/like
export const likeReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
    if (!reel) {
      return res.status(404).json({ success: false, message: 'Reel not found' })
    }
    if (reel.likes.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Already liked' })
    }
    reel.likes.push(req.user._id)
    await reel.save()
    res.status(200).json({ success: true, message: 'Reel liked' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// DELETE /api/reels/:id/like
export const unlikeReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
    if (!reel) {
      return res.status(404).json({ success: false, message: 'Reel not found' })
    }
    reel.likes = reel.likes.filter((id) => id.toString() !== req.user._id.toString())
    await reel.save()
    res.status(200).json({ success: true, message: 'Reel unliked' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// POST /api/reels/:id/save
export const saveReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
    if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' })
    if (reel.saves.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Already saved' })
    }
    reel.saves.push(req.user._id)
    await reel.save()
    res.status(200).json({ success: true, message: 'Reel saved' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// DELETE /api/reels/:id/save
export const unsaveReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
    if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' })
    reel.saves = reel.saves.filter((id) => id.toString() !== req.user._id.toString())
    await reel.save()
    res.status(200).json({ success: true, message: 'Reel unsaved' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// POST /api/reels/:id/comments
export const addReelComment = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
    if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' })

    const { content } = req.body
    const comment = await Comment.create({
      author: req.user._id,
      content,
      post: null,
    })

    reel.comments.push(comment._id)
    await reel.save()

    const populated = await Comment.findById(comment._id).populate('author', 'name username avatar')

    res.status(201).json({ success: true, message: 'Comment added', comment: populated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// GET /api/reels/:id/comments
export const getReelComments = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
    if (!reel) return res.status(404).json({ success: false, message: 'Reel not found' })

    const comments = await Comment.find({ _id: { $in: reel.comments } })
      .populate('author', 'name username avatar')
      .sort({ createdAt: -1 })

    res.status(200).json({ success: true, comments })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}
