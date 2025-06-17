import React, { useEffect, useRef, useState } from 'react'
import { getAuthToken } from '../auth/AuthProvider'

interface useWebSocketInterface {
    url: string
    onOpen: any
    onMessage: any
}

const useWebsocket = (url: string) => {
    const socketRef = useRef<WebSocket | null>(null)
    const [value, setValue] = useState(null)

    useEffect(() => {
        const token = getAuthToken()
        const socket = new WebSocket(url + `/?token=${token}`)

        socket.onopen = () => {console.log("[WebSocket] Connection opened.")}
        socket.onmessage = (e) => setValue(e.data)

        socket.onclose = () => {
            console.log("[WebSocket] Connection closed.")
        }

        socket.onerror = (err) => {
            console.log("[WebSocket] Error:", err)
        }

        // Update current socket
        socketRef.current = socket

        // Close socket connection on exit
        return () => {
            socket.close()
        }
    }, [])

    // Make sure send references current socket
    return [value, socketRef.current?.send.bind(socketRef.current)]
}

export default useWebsocket