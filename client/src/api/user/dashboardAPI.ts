import usersApiClient from "./_userAPI"

interface GetFolderContentInterface {
    folder_hash: string | null
}

export const getFolderDashboard = async (data: GetFolderContentInterface) => {
    try {
        const response = await usersApiClient.get(`/dashboard/${data.folder_hash}`)
        return response

    } catch (e: any) {
        const message =
            e.response?.data?.detail ||
            "Error fetching folder content.";

        return {
            status: e.response.data.status || 400,
            message: message
        };
    }
}