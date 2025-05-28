import axios, { type AxiosInstance } from "axios"
import { getAuthToken } from "../auth/AuthProvider"


// Get API URL or use default
const baseURL = import.meta.env.VITE_BASE_API_URL || '/api'

// API Client
const apiClient: AxiosInstance = axios.create({
    baseURL: baseURL
})

// Intercept all requests to add the authToken, except for login
apiClient.interceptors.request.use(
    async (config) => {
        const token = getAuthToken()

        if (token && (config.url !== '/login')) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

export default apiClient;