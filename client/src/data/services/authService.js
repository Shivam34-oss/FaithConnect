import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/auth`
  : '/api/auth'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const authService = {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    const data = response.data
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  },

  async register(userData) {
    const response = await axios.post(`${API_URL}/register`, userData)
    const data = response.data
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  },

  async logout() {
    try {
      await axios.post(`${API_URL}/logout`, {}, { headers: getAuthHeader() })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
    }
  },

  async getProfile() {
    const response = await axios.get(`${API_URL}/profile`, { headers: getAuthHeader() })
    return response.data
  },

  async updateProfile(userData) {
    const response = await axios.put(`${API_URL}/profile`, userData, { headers: getAuthHeader() })
    return response.data
  },

  async refreshToken() {
    // Refresh token logic if needed
    return null
  },
}
