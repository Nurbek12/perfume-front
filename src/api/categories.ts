import api from "."

export const getAllCategories = (qs: any) => api.get(`/api/v1/categories/?${qs}`)

export const createCategory = (data: any) => api.post('/api/v1/categories/', data)

export const getTree = () => api.get('/api/v1/category-tree/')

export const updateCategory = (id: any, data: any) => api.put(`/api/v1/categories/${id}/`, data)

export const deleteCategory = (id: any) => api.delete(`/api/v1/categories/${id}/`)