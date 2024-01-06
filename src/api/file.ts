import api from "."

export const sendImage = async (data: FormData) => api.post(`/api/v1/images/`, data)
