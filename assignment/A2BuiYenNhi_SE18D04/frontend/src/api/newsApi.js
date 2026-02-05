import axiosClient from './axiosClient'

const newsApi = {
  getAll: () => axiosClient.get('/news'),

  getByCreatedBy: (accountId) =>
    axiosClient.get(`/news/created-by/${accountId}`),

  getById: (id) => axiosClient.get(`/news/${id}`),

  search: (keyword) =>
    axiosClient.get('/news/search', {
      params: { keyword },
    }),

  create: (data) => axiosClient.post('/news', data),

  update: (id, data) => axiosClient.put(`/news/${id}`, data),

  remove: (id) => axiosClient.delete(`/news/${id}`),
}

export default newsApi
