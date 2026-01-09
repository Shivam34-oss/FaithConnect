import { Community } from '../models/Community.js'
import { User } from '../models/User.js'

// @desc    Get all communities
// @route   GET /api/communities
// @access  Private
export const getCommunities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const communities = await Community.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Community.countDocuments()
    const hasMore = skip + communities.length < total

    res.status(200).json({
      success: true,
      communities,
      pagination: {
        page,
        limit,
        total,
        hasMore,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Get community by ID
// @route   GET /api/communities/:id
// @access  Private
export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('members', 'name username avatar')
      .populate('admins', 'name username avatar')
      .populate('posts', 'content createdAt author')

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      })
    }

    res.status(200).json({
      success: true,
      community,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Create community
// @route   POST /api/communities
// @access  Private
export const createCommunity = async (req, res) => {
  try {
    const { name, description, image, faith, isPrivate } = req.body

    const community = await Community.create({
      name,
      description,
      image,
      faith,
      isPrivate: isPrivate || false,
      admins: [req.user._id],
      members: [req.user._id],
    })

    res.status(201).json({
      success: true,
      message: 'Community created successfully',
      community,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Join community
// @route   POST /api/communities/:id/join
// @access  Private
export const joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      })
    }

    // Check if already a member
    if (community.members.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already a member of this community',
      })
    }

    community.members.push(req.user._id)
    await community.save()

    res.status(200).json({
      success: true,
      message: 'Joined community successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Leave community
// @route   DELETE /api/communities/:id/leave
// @access  Private
export const leaveCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      })
    }

    // Check if user is an admin
    if (community.admins.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Admins cannot leave the community',
      })
    }

    community.members = community.members.filter(
      (id) => id.toString() !== req.user._id.toString()
    )
    await community.save()

    res.status(200).json({
      success: true,
      message: 'Left community successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}
