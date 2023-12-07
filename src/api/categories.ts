import api from "."

export const getAllCategories = (qs: string) => api.get(`/api/v1/categories?${qs}`)