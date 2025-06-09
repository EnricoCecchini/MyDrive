import { useAuth } from "../../auth/AuthProvider";
import authApiClient from "./_authAPI";

interface LoginRequest {
    username: string;
    password: string;
}

export const postLoginForm = async (loginData: LoginRequest) => {
    try {
        console.log(loginData)

        const resp = await authApiClient.post("/login", loginData)
        return resp;

    } catch (e: any) {
        const message =
            e.response?.data?.detail ||
            "Login failed. Please try again.";

        return {
            status: e.response.data.status || 400,
            message: message
        };
    }
}