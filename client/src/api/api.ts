import axios, { type AxiosInstance } from "axios"
import { getAuthToken, handleGlobalLogout, useAuth } from "../auth/AuthProvider"


// Get API URL or use default
const baseURL = import.meta.env.VITE_BASE_API_URL || '/api'
console.log(baseURL)

// API Client
const apiClient: AxiosInstance = axios.create({
    baseURL: baseURL
})

// Intercept all requests to add the authToken, except for login
export const applyAuthInterceptor = (client: AxiosInstance) => {
    client.interceptors.request.use(
        async (config) => {
            const token = getAuthToken()

            if (token && (config.url !== '/login')) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        },
        (error) => Promise.reject(error)
    )

    return client;
}

// Interceptor to use set Content-Type to 'application/json' ONLY when needed, else browser sets automatically
export const applyJSONHeaderInterceptor = (client: AxiosInstance) => {
    client.interceptors.request.use(
        (config) => {
        // If the request is not using FormData, set Content-Type to 'application/json'
        if (!(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );

    return client
}

export const applyExpiredJWTInterceptor = (client: AxiosInstance) => {
    client.interceptors.response.use(
        // Get response
        response => response,
        error => {
            console.log("RESP ERROR", error.status)
            // Check status code for expired JWT auth token
            if (error.response?.status === 401) {
                handleGlobalLogout()
            }
            return Promise.reject(error)
        }
    )
}

// Apply interceptor to base apiClient
applyAuthInterceptor(apiClient);
applyJSONHeaderInterceptor(apiClient);
applyExpiredJWTInterceptor(apiClient)

export default apiClient;