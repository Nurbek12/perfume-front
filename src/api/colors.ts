import api from "."

export const getAllColors = async (qs: string) => {
    return api.get(`/${qs}`)
}