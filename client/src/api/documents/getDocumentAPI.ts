import docsApiClient from "./_documentAPI"

export const getDocument = async (hash: string) => {
    console.log("Document hash:", hash)

    if (!hash) {
        return {
            status: 400,
            message: "Document hash is required."
        };
    }

    try {
        const response = await docsApiClient.get(`/document/${hash}`)
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