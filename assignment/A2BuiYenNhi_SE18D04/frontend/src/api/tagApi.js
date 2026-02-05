import axiosClient from './axiosClient'

const tagApi = {
  getAll: () => axiosClient.get('/tags'),
  getById: (id) => axiosClient.get(`/tags/${id}`),
  search: (keyword) =>
    axiosClient.get('/tags/search', { params: { keyword } }),
  create: (data) => axiosClient.post('/tags', data),
  update: (id, data) => axiosClient.put(`/tags/${id}`, data),
  remove: (id) => axiosClient.delete(`/tags/${id}`),
}

export default tagApi
