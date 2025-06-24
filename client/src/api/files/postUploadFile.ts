import filesAPIClient from "./_filesAPI"

interface PostUploadFileInterface {
    folder_hash: string | null
    file: File
}

export const postUploadFile = async (data: PostUploadFileInterface) => {
    try {
        const formData = new FormData()
        formData.append("file", data.file)

        const response = await filesAPIClient.post(`/upload_file/folder/${data.folder_hash || 'root'}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
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