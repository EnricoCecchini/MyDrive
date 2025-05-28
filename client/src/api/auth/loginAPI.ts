import { useAuth } from "../../auth/AuthProvider";
import authApiClient from "./_authAPI";

interface LoginRequest {
    username: string;
    password: string;
}

export const postLoginForm = async (loginData: LoginRequest) => {
    // Import login func from useAuth to set access token
    const { login } = useAuth()

    try {
        const response = await authApiClient.post("/login", loginData)

        if (response.status !== 200) {
            alert(response.data.message)
            return null
        }

        login(response.data.access_token)
        return response.data
    } catch (e) {
        console.log("Error on login:", e)
    }
}