export const getLeaders = async (req, res) => {
  try {
    // TODO: Fetch users with role 'leader' from database
    // For now returning empty list to prevent crash
    res.status(200).json({ success: true, leaders: [] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}