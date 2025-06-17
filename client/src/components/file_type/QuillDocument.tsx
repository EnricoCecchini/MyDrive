import Quill, { Delta } from 'quill'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ws_UpdateDocumentContent } from '../../api/documents/socket/wsUpdateDocumentContent'
import useWebsocket from '../../hooks/useWebsocket'
import { socketURL } from '../../api/documents/socket/_socketAPI'


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

    const initializeQuill = useCallback(() => {
        console.log("Quill init")
        if (!editorRef.current || quillRef.current) return

        const quill = new Quill(editorRef.current,  {theme: "snow", modules: {toolbar: OPTIONS.toolbar}, readOnly: readOnly })

        quillRef.current = quill

        // Set initial value
        quill.setContents(content)
        prevContentRef.current = quill.getContents()

        quill.on('text-change', (delta, oldContent, source) => {
            // Check change does not come from user to avoid infinite loop
            if (source !== 'user') return

            const currContent = quill.getContents()
            const diff = prevContentRef.current?.diff(currContent)
            console.log("NEW: ", diff)

            console.log(delta)

            if (socketRef.current) {
                socketRef.current.send(JSON.stringify(diff))

                console.log("Returned content", socketRef.current)
                prevContentRef.current = currContent
            }
        })
    }, [])

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

    useEffect(() => {
        if (!quillRef.current || !file_hash) return

        const currContent = quillRef.current.getContents()
        socketRef.current = ws_UpdateDocumentContent({file_hash, diffs: currContent})

        if (!socketRef.current) return

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("[WebSocket] Message received:", data);

            // Do something with the data, like updating state
        };

        return () => {
            socketRef.current?.close()
        }
    }, [file_hash])

    const handleExportClick = async () => {
        if (!quillRef.current) return

        const htmlContent = quillRef.current.root.innerHTML
    }

    return (
        <>
            <div>Quill Doc</div>

            <div id="editor" ref={editorRef} style={{ height: "60vh", width: "100%", borderWidth: "1px" }} />

            <button onClick={handleExportClick}>Click</button>
        </>
    )
}

export default QuillDocument