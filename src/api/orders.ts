import api from "."
import { IOrder } from "../interfaces"

export const getMyOrders = async (qs: string) => api.post(`/api/v1/orders?${qs}`)

export const createOrder = async (orderData: IOrder) => api.post('/api/v1/orders/', orderData)