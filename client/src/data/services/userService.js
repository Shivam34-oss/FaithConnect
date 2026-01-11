import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/users`
  : '/api/users'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const userService = {
  async getUserById(id) {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() })
    return response.data
  },

  async updateUser(id, userData) {
    const response = await axios.put(`${API_URL}/${id}`, userData, { headers: getAuthHeader() })
    return response.data
  },

  async followUser(id) {
    const response = await axios.post(`${API_URL}/${id}/follow`, {}, { headers: getAuthHeader() })
    return response.data
  },

  async unfollowUser(id) {
    const response = await axios.delete(`${API_URL}/${id}/unfollow`, { headers: getAuthHeader() })
    return response.data
  },

  async getFollowers(id) {
    const response = await axios.get(`${API_URL}/${id}/followers`, { headers: getAuthHeader() })
    return response.data
  },

  async getFollowing(id) {
    const response = await axios.get(`${API_URL}/${id}/following`, { headers: getAuthHeader() })
    return response.data
  },
}
