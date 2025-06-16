import Quill, { Delta } from 'quill'
import React, { useCallback, useEffect, useRef } from 'react'
import { ws_UpdateDocumentContent } from '../../api/documents/socket/wsUpdateDocumentContent'


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
            const currContent = quill.getContents()
            const diff = prevContentRef.current?.diff(currContent)
            console.log("NEW: ", diff)

            console.log(quill.root.innerHTML)

            if (socketRef.current) {
                socketRef.current.send(JSON.stringify(diff))
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

        console.log("HASH SOCKET", file_hash)
        const currContent = quillRef.current.getContents()
        socketRef.current = ws_UpdateDocumentContent({file_hash, diffs: currContent})

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