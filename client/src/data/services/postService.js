import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/posts`
  : '/api/posts'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const postService = {
  async getPosts(params = {}) {
    const response = await axios.get(API_URL, { params, headers: getAuthHeader() })
    return response.data
  },

  async getPostById(id) {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() })
    return response.data
  },

  async createPost(postData) {
    const response = await axios.post(API_URL, postData, { headers: getAuthHeader() })
    return response.data
  },

  async updatePost(id, postData) {
    const response = await axios.put(`${API_URL}/${id}`, postData, { headers: getAuthHeader() })
    return response.data
  },

  async deletePost(id) {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() })
    return response.data
  },

  async likePost(id) {
    const response = await axios.post(`${API_URL}/${id}/like`, {}, { headers: getAuthHeader() })
    return response.data
  },

  async unlikePost(id) {
    const response = await axios.delete(`${API_URL}/${id}/like`, { headers: getAuthHeader() })
    return response.data
  },

  async addComment(postId, commentData) {
    const response = await axios.post(`${API_URL}/${postId}/comments`, commentData, { headers: getAuthHeader() })
    return response.data
  },

  async deleteComment(postId, commentId) {
    const response = await axios.delete(`${API_URL}/${postId}/comments/${commentId}`, { headers: getAuthHeader() })
    return response.data
  },
}
