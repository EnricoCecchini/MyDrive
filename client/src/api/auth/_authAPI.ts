import axios from "axios"
import { applyAuthInterceptor, applyExpiredJWTInterceptor, applyJSONHeaderInterceptor } from "../api"

// Create auth API client
const baseURL = import.meta.env.VITE_BASE_API_URL;
const authApiClient = axios.create({ baseURL: `${baseURL}/api/auth` });


// Apply Auth Interceptor to client
applyAuthInterceptor(authApiClient);
applyJSONHeaderInterceptor(authApiClient);
applyExpiredJWTInterceptor(authApiClient)

export default authApiClient;