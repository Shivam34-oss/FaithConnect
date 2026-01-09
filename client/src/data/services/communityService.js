import apiClient from '@core/utils/apiClient'
import { API_ENDPOINTS } from '@core/utils/constants'

export const communityService = {
  async getCommunities(params = {}) {
    return await apiClient.get(API_ENDPOINTS.COMMUNITIES.BASE, { params })
  },

  async getCommunityById(id) {
    return await apiClient.get(API_ENDPOINTS.COMMUNITIES.BY_ID(id))
  },

  async createCommunity(communityData) {
    return await apiClient.post(API_ENDPOINTS.COMMUNITIES.BASE, communityData)
  },

  async updateCommunity(id, communityData) {
    return await apiClient.put(API_ENDPOINTS.COMMUNITIES.BY_ID(id), communityData)
  },

  async deleteCommunity(id) {
    return await apiClient.delete(API_ENDPOINTS.COMMUNITIES.BY_ID(id))
  },

  async joinCommunity(id) {
    return await apiClient.post(API_ENDPOINTS.COMMUNITIES.JOIN(id))
  },

  async leaveCommunity(id) {
    return await apiClient.delete(API_ENDPOINTS.COMMUNITIES.LEAVE(id))
  },
}
