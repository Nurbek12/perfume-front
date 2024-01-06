import api from "."

export const getAllBrands = async (qs: string) => api.get(`/api/v1/brands/`)

export const getBrandById = async (id: string) => api.get(`/api/v1/brands/${id}/`)

export const createBrand = async (data: any) => api.post(`/api/v1/brands/`, data, {
    headers: {
        "Content-Type": "multipart-form/data"
    }
})
 
export const updateBrand = async (id: any, data: any) => api.put(`/api/v1/brands/${id}/`, {
    headers: {
        "Content-Type": "multipart-form/data"
    }
})

export const deleteBrand = async (id: any) => api.delete(`/api/v1/brands/${id}`)
