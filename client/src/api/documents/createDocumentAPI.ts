import docsApiClient from "./_documentAPI"

interface createDocumentInterface {
    folder_hash: string | null
    name: string
    type: number
}

export const postCreateDocument = async (data: createDocumentInterface) => {
    console.log("New document data:", data)

    try {
        const response = await docsApiClient.post(`/new`, data)
        return response

    } catch (e: any) {
        const message =
            e.response?.data?.detail ||
            "Error creating document.";

        return {
            status: e.response.data.status || 400,
            message: message
        };
    }
}