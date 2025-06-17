import type { Delta } from "quill";
import { socketURL } from "./_socketAPI";
import { getAuthToken } from "../../../auth/AuthProvider";


interface wsUpdateDocumentContentInterface {
    file_hash: string;
    diffs: Delta | null;
}

export const ws_UpdateDocumentContent = ({ file_hash, diffs }: wsUpdateDocumentContentInterface) => {
    console.log("hash", file_hash)

    try{
        const token = getAuthToken()
        const wsURL = `${socketURL}/document/${file_hash}?token=${token}`

        // Create socket
        const socket = new WebSocket(wsURL)

        socket.onopen = () => {
            console.log("[WebSocket] Connection opened.")
        }

        socket.onclose = () => {
            console.log("[WebSocket] Connection closed.")
        }

        socket.onerror = (err) => {
            console.log("[WebSocket] Error:", err)
        }

        return socket

    } catch (e) {
        console.error("Error on document update socket:", e)
        return null
    }
}