import apiClient from '@core/utils/apiClient'
import { API_ENDPOINTS } from '@core/utils/constants'

export const authService = {
  async login(email, password) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    })
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    return response
  },

  async register(userData) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    return response
  },

  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
    }
  },

  async getProfile() {
    return await apiClient.get(API_ENDPOINTS.AUTH.PROFILE)
  },

  async updateProfile(userData) {
    return await apiClient.put(API_ENDPOINTS.AUTH.PROFILE, userData)
  },

  async refreshToken() {
    return await apiClient.post(API_ENDPOINTS.AUTH.REFRESH)
  },
}
