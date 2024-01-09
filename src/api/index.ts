import axios from "axios"
import store from '../store'

export const baseURL = import.meta.env.VITE_PROXY_URL||''
// const token = import.meta.env.VITE_PROXY_TOKEN

const api = axios.create({ baseURL: baseURL || '/' })

api.interceptors.response.use(
  (response) => {
    checkToken();
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) store.commit("LOGOUT");
    return Promise.reject(error);
  }
);

export function checkToken(){
  const token = store.getters.token
  if(token) api.defaults.headers.common['Authorization'] = `Token ${token}`
}

checkToken()

export default api