import api from "."

export const sendImage = async (id: number, data: FormData) => api.post(`/api/v1/products/${id}/create_image/`, data)
