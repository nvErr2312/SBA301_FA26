import axiosClient from './axiosClient'

const accountApi = {
  getAll: () => axiosClient.get('/accounts'),

  getById: (id) => axiosClient.get(`/accounts/${id}`),

  login: (email, password) =>
    axiosClient.post('/accounts/login', { email, password }),

  search: (keyword) =>
    axiosClient.get('/accounts/search', {
      params: { keyword },
    }),

  create: (data) => axiosClient.post('/accounts', data),

  update: (id, data) => axiosClient.put(`/accounts/${id}`, data),

  remove: (id) => axiosClient.delete(`/accounts/${id}`),
}

export default accountApi
