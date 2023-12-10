import api from "."

export const getAllBrands = async (qs: string) => api.get(`/api/v1/brands?${qs}`)

export const getBrandById = async (id: string) => api.get(`/api/v1/brands/${id}/`)