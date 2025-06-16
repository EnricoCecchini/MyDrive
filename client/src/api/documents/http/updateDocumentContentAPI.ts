import docsApiClient from "./_documentAPI"


interface UpdateDocumentContentInterface {
    hash: string
    content: string
}

export const putUpdateDocumentContent = async (data: UpdateDocumentContentInterface) => {
    console.log("Document hash:", data.hash)

    if (!data.hash) {
        return {
            status: 400,
            message: "Document hash and content is required."
        };
    }

    try {
        const response = await docsApiClient.put(`/update/${data.hash}`, { content: data.content || "" })
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