import usersApiClient from "./_userAPI"


export const getUserProfile = async () => {
    try {
        const response = await usersApiClient.get("/profile")
        return response

    } catch (e: any) {
        const message =
            e.response?.data?.detail ||
            "Error fetching user profile.";

        console.log(message, e)
        return {
            status: 400,
            message: message
        };
    }
}


interface UpdateUserPasswordInterface {
    password: string
    password_confirm: string
}

export const updateUserPassword = async (data: UpdateUserPasswordInterface) => {
    try {
        const response = await usersApiClient.put("/update_password", data)
        console.log(response)

        return response

    } catch (e: any) {
        const message =
            e.response?.data?.detail ||
            "Error updating password.";

        console.log(message, e)
        return {
            status: 400,
            message: message
        };
    }
}