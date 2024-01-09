import api from "."
import { IReview } from "../interfaces"

export const getAllProducts = async (qs: string) => api.get(`/api/v1/products/${qs}`)

export const getProductById = async (id: number, qs: string) => api.get(`/api/v1/products/${id}/?${qs}`)

export const createReview = async (revewData: IReview) => api.post('/api/v1/ratings/', revewData)

export const getReview = async (revewData: IReview) => api.post('/api/v1/ratings/', revewData)

export const createProduct =  async (data: any) => api.post('/api/v1/products/', data)

export const deleteProduct =  async (id: any) => api.delete(`/api/v1/products/${id}/`)

export const updateProduct =  async (id: any, data: any) => api.put(`/api/v1/products/${id}/`, data)