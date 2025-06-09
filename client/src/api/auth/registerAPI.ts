import { useAuth } from "../../auth/AuthProvider";
import authApiClient from "./_authAPI";

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    password_confirm: string
}

export const postRegisterForm = async (registerData: RegisterRequest) => {
    try {
        console.log(registerData)

        const resp = await authApiClient.post("/register", registerData)
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