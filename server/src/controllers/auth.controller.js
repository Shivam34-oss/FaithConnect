import { User } from '../models/User.js'
import { validationResult } from 'express-validator'

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }

    const { name, email, username, password, faith, bio, avatar, role } = req.body

    // Check if user exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or username',
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      username,
      password,
      faith,
      bio,
      avatar,
      role: role || 'worshiper',
    })

    // Generate token
    const token = user.generateToken()

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        faith: user.faith,
        location: user.location,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check password
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Generate token
    const token = user.generateToken()

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        faith: user.faith,
        location: user.location,
        followers: user.followers,
        following: user.following,
        posts: user.posts,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
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

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, faith, location, avatar, role } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        bio,
        faith,
        location,
        avatar,
        role: role || req.user.role,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    // In a JWT-based system, logout is typically handled client-side
    // by removing the token. This endpoint can be used for logging purposes.
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}
