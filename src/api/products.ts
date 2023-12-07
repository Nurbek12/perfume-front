import api from "."

export const getAllProducts = async (qs: string) => api.get(`/api/v1/products?${qs}&is_gift=false`)

export const getAllGifts = async (qs: string) => api.get(`/api/v1/products?${qs}&is_gift=true`)

export const getProductById = async (id: number, qs: string) => api.get(`/api/v1/products/${id}?${qs}`)