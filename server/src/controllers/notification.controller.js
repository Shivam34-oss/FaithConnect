import { Notification } from '../models/Notification.js'

// GET /api/notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .populate('actor', 'name username avatar')
      .sort({ createdAt: -1 })
      .limit(50)

    res.status(200).json({ success: true, notifications })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}

// POST /api/notifications/:id/read
export const markRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true })
    res.status(200).json({ success: true, message: 'Notification marked as read' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error' })
  }
}
