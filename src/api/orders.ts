import api from "."
import { IOrder } from "../interfaces"

export const getMyOrders = async (id: string) => api.get(`/api/v1/orders/${id}/`)

export const createOrder = async (orderData: IOrder) => api.post('/api/v1/orders/', orderData)