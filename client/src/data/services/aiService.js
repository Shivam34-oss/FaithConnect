import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/chat`
  : '/api/chat'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const aiService = {
  async sendMessage(message, context = {}) {
    try {
      const response = await axios.post(
        `${API_URL}/message`,
        { message, context },
        { headers: getAuthHeader() }
      )
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async getChatHistory(limit = 20) {
    try {
      const response = await axios.get(
        `${API_URL}/history?limit=${limit}`,
        { headers: getAuthHeader() }
      )
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async clearChatHistory() {
    try {
      const response = await axios.delete(
        `${API_URL}/history`,
        { headers: getAuthHeader() }
      )
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  async searchKnowledge(query) {
    try {
      const response = await axios.post(
        `${API_URL}/search`,
        { query },
        { headers: getAuthHeader() }
      )
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}
