import api from "."

export const login = async (loginData: any) => api.post('/auth/mobile/', loginData)

export const verify = async (verifyData: any) => api.post(`/auth/token/`, verifyData)

export const register = async (id: string, registerData: any, token: string|undefined) => api.put(`/api/v1/clients/${id}/`, registerData, !!token ? {
    headers: { "Authorization": `Token ${token}` }
}:{})

export const me = async (token: string) => api.get(`/api/v1/clients/`, {
    headers: { "Authorization": `Token ${token}` }
})
