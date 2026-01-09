import apiClient from '@core/utils/apiClient'
import { API_ENDPOINTS } from '@core/utils/constants'

export const userService = {
  async getUserById(id) {
    return await apiClient.get(API_ENDPOINTS.USERS.BY_ID(id))
  },

  async updateUser(id, userData) {
    return await apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), userData)
  },

  async followUser(id) {
    return await apiClient.post(API_ENDPOINTS.USERS.FOLLOW(id))
  },

  async unfollowUser(id) {
    return await apiClient.delete(API_ENDPOINTS.USERS.UNFOLLOW(id))
  },

  async getFollowers(id) {
    return await apiClient.get(`${API_ENDPOINTS.USERS.BY_ID(id)}/followers`)
  },

  async getFollowing(id) {
    return await apiClient.get(`${API_ENDPOINTS.USERS.BY_ID(id)}/following`)
  },
}
