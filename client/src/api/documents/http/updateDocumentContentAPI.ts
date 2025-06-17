import { getAuthToken } from "../../../auth/AuthProvider"
import docsApiClient from "./_documentAPI"


interface UpdateDocumentContentInterface {
    hash: string
    content: string
}

export const putUpdateDocumentContent = async (data: UpdateDocumentContentInterface) => {
    console.log("Document hash:", data.hash)

    if (!data.hash) {
        console.log("No hash")
        return {
            status: 400,
            message: "Document hash and content is required."
        };
    }

    try {
        console.log("API URL:", docsApiClient.getUri()+`/update/${data.hash}`)
        const response = await docsApiClient.put(`/update/${data.hash}`, { content: data.content || "" },)
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

export const putUpdateDocumentContentOnExit = async (data: UpdateDocumentContentInterface) => {
    console.log("Document hash:", data.hash)

    if (!data.hash) {
        console.log("No hash")
        return {
            status: 400,
            message: "Document hash and content is required."
        };
    }

    try {
        const token = getAuthToken()
        const updateURL = docsApiClient.getUri()+`/update_exit/${data.hash}`

        const payload = JSON.stringify({
            content: data.content,
            token: token
        })

        const contentBlob = new Blob([payload], { type: "application/json" })
        navigator.sendBeacon(updateURL, contentBlob)

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