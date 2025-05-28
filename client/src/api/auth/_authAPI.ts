import axios from "axios"
import { applyAuthInterceptor } from "../api"

// Create auth API client
const baseURL = import.meta.env.VITE_BASE_API_URL || "/api";
const authApiClient = axios.create({ baseURL: `${baseURL}/auth` });

// Apply Auth Interceptor to client
applyAuthInterceptor(authApiClient);

export default authApiClient;