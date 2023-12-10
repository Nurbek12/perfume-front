import api from "."
import { IOrder } from "../interfaces"

export const getMyOrders = async (id: string) => api.get(`/api/v1/orders/?expand=&items=product`)

export const createOrder = async (orderData: IOrder) => api.post('/api/v1/orders/', orderData)