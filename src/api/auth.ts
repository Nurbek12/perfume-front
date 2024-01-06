import api from '.'

export const login = (data: any) => api.post('/auth/jwt/create/', data)