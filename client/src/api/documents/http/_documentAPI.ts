import axios from "axios"
import { applyAuthInterceptor, applyExpiredJWTInterceptor, applyJSONHeaderInterceptor } from "../../api"

// Create auth API client
const baseURL = import.meta.env.VITE_BASE_API_URL;
const docsApiClient = axios.create({ baseURL: `${baseURL}/api/documents` });


// Apply Auth Interceptor to client
applyAuthInterceptor(docsApiClient);
applyJSONHeaderInterceptor(docsApiClient);
applyExpiredJWTInterceptor(docsApiClient)

export default docsApiClient;