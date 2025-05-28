import { useAuth } from "../../auth/AuthProvider";
import authApiClient from "./_authAPI";

interface LoginRequest {
    username: string;
    password: string;
}

export const postLoginForm = async (loginData: LoginRequest) => {
    try {
        console.log(loginData)

        const response = await authApiClient.post("/login", loginData)

        if (response.status !== 200) {
            alert(response.data.message)
            return response.data.message
        }

        return response.status

    } catch (e: any) {
        const message =
            e.response?.data?.detail ||
            "Login failed. Please try again.";

        return message;
    }
}