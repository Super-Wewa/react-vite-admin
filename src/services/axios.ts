
import axios from "axios";
import { constants } from "../lib/constants";
import { notify } from "../utils/functions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use((request) => {
  const authState = localStorage.getItem(constants.authPersistKey)
  if (authState) {
    const authJson = JSON.parse(authState)
    const { state: { token } }: { state: { token?: string } } = authJson
    if (token) {
      request.headers.Authorization = token
    }
  }
  return request
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error)
    notify("Oups! Une erreur inconnue s'est produite!", 'error')
    return Promise.reject(error)
  })

export default axiosInstance