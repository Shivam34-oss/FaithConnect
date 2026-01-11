import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/communities`
  : '/api/communities'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const communityService = {
  async getCommunities(params = {}) {
    const response = await axios.get(API_URL, { params, headers: getAuthHeader() })
    return response.data
  },

  async searchCommunities(search, page = 1, limit = 10) {
    const response = await axios.get(API_URL, { 
      params: { search, page, limit }, 
      headers: getAuthHeader() 
    })
    return response.data
  },

  async getCommunityById(id) {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() })
    return response.data
  },

  async createCommunity(communityData) {
    const response = await axios.post(API_URL, communityData, { headers: getAuthHeader() })
    return response.data
  },

  async updateCommunity(id, communityData) {
    const response = await axios.put(`${API_URL}/${id}`, communityData, { headers: getAuthHeader() })
    return response.data
  },

  async deleteCommunity(id) {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() })
    return response.data
  },

  async joinCommunity(id) {
    const response = await axios.post(`${API_URL}/${id}/join`, {}, { headers: getAuthHeader() })
    return response.data
  },

  async leaveCommunity(id) {
    const response = await axios.delete(`${API_URL}/${id}/leave`, { headers: getAuthHeader() })
    return response.data
  },
}
