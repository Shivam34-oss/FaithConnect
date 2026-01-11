import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/feed`
  : '/api/feed'

// Helper to get token
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const feedService = {
  getExploreFeed: async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(`${API_URL}/explore`, {
      params: { page, limit },
      headers: getAuthHeader()
    })
    return response.data
  }
}