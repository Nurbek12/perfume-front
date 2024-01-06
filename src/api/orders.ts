import api from "."
import { IOrder } from "../interfaces"

export const getOrders = async (id: string) => api.get(`/api/v1/orders/?expand=product`)

export const createOrder = async (orderData: IOrder) => api.post('/api/v1/orders/', orderData)

export const checkOrder = async (id: any, data: any) => api.put(`/api/v1/orders/${id}/`, data)