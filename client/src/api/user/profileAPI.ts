import usersApiClient from "./_userAPI"


export const getUserProfile = async () => {
    try {
        const response = await usersApiClient.get("/profile")

    } catch (e) {

    }
}