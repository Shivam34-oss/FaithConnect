import { User } from '../models/User.js'

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'name username avatar')
      .populate('following', 'name username avatar')
      .populate('posts', 'content createdAt')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Follow user
// @route   POST /api/users/:id/follow
// @access  Private
export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id)
    const currentUser = await User.findById(req.user._id)

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself',
      })
    }

    // Check if already following
    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already following this user',
      })
    }

    // Add to following and followers
    currentUser.following.push(userToFollow._id)
    userToFollow.followers.push(currentUser._id)

    await currentUser.save()
    await userToFollow.save()

    res.status(200).json({
      success: true,
      message: 'User followed successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Unfollow user
// @route   DELETE /api/users/:id/unfollow
// @access  Private
export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id)
    const currentUser = await User.findById(req.user._id)

    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Remove from following and followers
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollow._id.toString()
    )
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    )

    await currentUser.save()
    await userToUnfollow.save()

    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}
