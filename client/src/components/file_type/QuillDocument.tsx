import Quill, { Delta } from 'quill'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ws_UpdateDocumentContent } from '../../api/documents/socket/wsUpdateDocumentContent'
import { putUpdateDocumentContentOnExit, putUpdateDocumentContent } from '../../api/documents/http/updateDocumentContentAPI'
import { toast } from 'react-toastify'


const OPTIONS = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
    ]
}


interface QuillDocumentInterface {
    readOnly: boolean
    content: Delta
    file_hash?: string
}

export const QuillDocument: React.FC<QuillDocumentInterface> = ({ content, readOnly=false, file_hash }) => {
    const editorRef = useRef<HTMLDivElement>(null)
    const quillRef = useRef<Quill | null>(null)
    const prevContentRef = useRef<Delta | null>(null)
    const socketRef = useRef<WebSocket | null>(null)

    const isFirstLoad = useRef<boolean>(true)

    let contentDelta = new Delta()
    const [autosaveDebounce, setAutosaveDebounce] = useState<boolean>(false)

    // Callback function to initialize Quill editor
    const initializeQuill = useCallback(() => {
        console.log("Quill init")

        if (!editorRef.current || quillRef.current) return

        const quill = new Quill(editorRef.current,  {theme: "snow", modules: {toolbar: OPTIONS.toolbar}, readOnly: readOnly })
        quillRef.current = quill
    }, [])

    // Hook to initialize quill component
    useEffect(() => {
        if (quillRef.current || !editorRef.current) return

        initializeQuill();
        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change')
                quillRef.current = null
            }
        }
    }, [initializeQuill])

    // Hook to watch for changes to content and set initial content
    useEffect(() => {
        if (quillRef.current && content) {
            contentDelta = content

            quillRef.current.setContents(contentDelta)
            prevContentRef.current = quillRef.current.getContents()
        }
    }, [content])

    // Hook to handle socket connection for diff updates
    useEffect(() => {
        if (!quillRef.current) return

        quillRef.current.on("text-change", (delta, oldContent, source) =>{
            // Check change does not come from user to avoid infinite loop
            if (source !== 'user' || !quillRef.current) return

            const currContent = quillRef.current.getContents()
            const diff = prevContentRef.current?.diff(currContent)

            // Store diff in database and update content
            if (socketRef.current) {
                socketRef.current.send(JSON.stringify(diff))

                console.log("Returned content", socketRef.current)
                prevContentRef.current = currContent
            }
        })
    }, [])

    // Hook to handle broadcasted data from websocket
    useEffect(() => {
        if (!quillRef.current || !file_hash) return

        const currContent = quillRef.current.getContents()
        socketRef.current = ws_UpdateDocumentContent({file_hash, diffs: currContent})

        if (!socketRef.current) return


        socketRef.current.onmessage = (event) => {
            console.log("[WebSocket] Message received. Parsing data");
            const data = JSON.parse(event.data);
            console.log("[WebSocket] Message received:", data);

            // Update quill with new diff
            const newDelta = new Delta(data)
            quillRef.current?.updateContents(newDelta)
        };

        socketRef.current.onclose = () => {
            if (isFirstLoad.current) {
                isFirstLoad.current = false
                return
            }

            console.log("[WebSocket] Closing connection. Saving latest content.")
            handleSaveOnExit()
        }

        // Handle autosave on exit page
        window.addEventListener("beforeunload", handleSaveOnExit)

        return () => {
            socketRef.current?.close()
            window.removeEventListener("beforeunload", handleSaveOnExit)
        }
    }, [file_hash])

    // Handle saving current content on exit page
    const handleSaveOnExit = useCallback(() => {
        if (!quillRef.current || !editorRef.current || !file_hash) return

        console.log("Saving latest content on exit.")
        const content = quillRef.current.getText()
        putUpdateDocumentContentOnExit({ hash: file_hash, content: content })
    }, [file_hash])

    const handleAutoSave = async () => {
        if (!quillRef.current || !file_hash) return

        console.log("Autosave")
        try {
            const currContent = quillRef.current.getText()
            console.log(currContent)

            const resp = await putUpdateDocumentContent({hash: file_hash, content: currContent})
            if (resp.status !== 200) {
                console.error("Error autosaving:", resp)
                toast.error("Error autosaving.")
            }

        } catch (e) {
            console.error("Error autosaving:", e)
            toast.error("Error autosaving.")
        }
    }

    // Auto-Save hook to store plaintext content every 10 seconds
    useEffect(() => {
        const autosaveInterval = setInterval(async () => {
            if (autosaveDebounce) return

            console.log("Autosaving")
            setAutosaveDebounce(true)

            await handleAutoSave()

            setAutosaveDebounce(false)

        }, 10000)

        return () => clearInterval(autosaveInterval)

    }, [])


    return (
        <>
            <div id="editor" ref={editorRef} style={{ height: "60vh", width: "100%", borderWidth: "1px" }} />
        </>
    )
}

export default QuillDocument