import axios from "axios"
import { applyAuthInterceptor, applyJSONHeaderInterceptor } from "../api"

// Create auth API client
const baseURL = import.meta.env.VITE_BASE_API_URL;
const usersApiClient = axios.create({ baseURL: `${baseURL}/api/users` });


// Apply Auth Interceptor to client
applyAuthInterceptor(usersApiClient);
applyJSONHeaderInterceptor(usersApiClient);

export default usersApiClient;