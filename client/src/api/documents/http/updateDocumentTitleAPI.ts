import docsApiClient from "./_documentAPI"


interface UpdateDocumentTitleInterface {
    hash: string
    name: string
}

export const putUpdateDocumentTitle = async (data: UpdateDocumentTitleInterface) => {
    console.log("Document hash:", data.hash)

    if (!data.hash || !data.name) {
        return {
            status: 400,
            message: "Document hash and name is required."
        };
    }

    try {
        const response = await docsApiClient.put(`/rename/${data.hash}`, { name: data.name })
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