import axios from "axios"
import { applyAuthInterceptor, applyExpiredJWTInterceptor, applyJSONHeaderInterceptor } from "../api"

// Create auth API client
const baseURL = import.meta.env.VITE_BASE_API_URL;
const filesAPIClient = axios.create({ baseURL: `${baseURL}/api/files` });


// Apply Auth Interceptor to client
applyAuthInterceptor(filesAPIClient);
applyJSONHeaderInterceptor(filesAPIClient);
applyExpiredJWTInterceptor(filesAPIClient)

export default filesAPIClient;