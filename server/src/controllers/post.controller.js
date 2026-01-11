import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import { Comment } from '../models/Comment.js'

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const posts = await Post.find()
      .populate('author', 'name username avatar')
      .populate('community', 'name image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Post.countDocuments()
    const hasMore = skip + posts.length < total

    res.status(200).json({
      success: true,
      posts,
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

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Private
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name username avatar bio')
      .populate('community', 'name image')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name username avatar',
        },
      })

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    res.status(200).json({
      success: true,
      post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Create post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { content, images, community, tags, isPublic } = req.body

    const post = await Post.create({
      author: req.user._id,
      content,
      images: images || [],
      community: community || null,
      tags: tags || [],
      isPublic: isPublic !== undefined ? isPublic : true,
    })

    // Add post to user's posts array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: post._id },
    })

    // If community post, add to community
    if (community) {
      const Community = (await import('../models/Community.js')).Community
      await Community.findByIdAndUpdate(community, {
        $push: { posts: post._id },
      })
    }

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name username avatar')
      .populate('community', 'name image')

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: populatedPost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      })
    }

    const { content, images, tags, isPublic } = req.body

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content,
        images,
        tags,
        isPublic,
      },
      { new: true, runValidators: true }
    )
      .populate('author', 'name username avatar')
      .populate('community', 'name image')

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      })
    }

    // Remove post from user's posts array
    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: post._id },
    })

    // Delete all comments associated with the post
    await Comment.deleteMany({ post: post._id })

    // Delete the post
    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Like post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    // Check if already liked
    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Post already liked',
      })
    }

    post.likes.push(req.user._id)
    await post.save()

    res.status(200).json({
      success: true,
      message: 'Post liked successfully',
      post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Unlike post
// @route   DELETE /api/posts/:id/like
// @access  Private
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    )
    await post.save()

    res.status(200).json({
      success: true,
      message: 'Post unliked successfully',
      post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { content } = req.body

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    const comment = await Comment.create({
      author: req.user._id,
      content,
      post: post._id,
    })

    post.comments.push(comment._id)
    await post.save()

    const populatedComment = await Comment.findById(comment._id).populate(
      'author',
      'name username avatar'
    )

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: populatedComment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    })
  }
}
