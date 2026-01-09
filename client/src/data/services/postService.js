import apiClient from '@core/utils/apiClient'
import { API_ENDPOINTS } from '@core/utils/constants'

export const postService = {
  async getPosts(params = {}) {
    return await apiClient.get(API_ENDPOINTS.POSTS.BASE, { params })
  },

  async getPostById(id) {
    return await apiClient.get(API_ENDPOINTS.POSTS.BY_ID(id))
  },

  async createPost(postData) {
    return await apiClient.post(API_ENDPOINTS.POSTS.CREATE, postData)
  },

  async updatePost(id, postData) {
    return await apiClient.put(API_ENDPOINTS.POSTS.UPDATE(id), postData)
  },

  async deletePost(id) {
    return await apiClient.delete(API_ENDPOINTS.POSTS.DELETE(id))
  },

  async likePost(id) {
    return await apiClient.post(API_ENDPOINTS.POSTS.LIKE(id))
  },

  async unlikePost(id) {
    return await apiClient.delete(API_ENDPOINTS.POSTS.LIKE(id))
  },

  async addComment(postId, commentData) {
    return await apiClient.post(API_ENDPOINTS.POSTS.COMMENT(postId), commentData)
  },

  async deleteComment(postId, commentId) {
    return await apiClient.delete(
      `${API_ENDPOINTS.POSTS.COMMENT(postId)}/${commentId}`
    )
  },
}
