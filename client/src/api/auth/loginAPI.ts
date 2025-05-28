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
        return {
            status: resp.status,
            message: resp.data.message,
            token: resp.data.access_token,
            token_type: resp.data.token_type
        };

    } catch (e: any) {
        const message =
            e.response?.data?.detail ||
            "Login failed. Please try again.";

        return {
            status: 400,
            message: message
        };
    }
}