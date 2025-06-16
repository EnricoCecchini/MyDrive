import { useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDocument } from '../../api/documents/getDocumentAPI';
import { putUpdateDocumentContent } from '../../api/documents/updateDocumentContentAPI';
import { putUpdateDocumentTitle } from '../../api/documents/updateDocumentTitleAPI';
import ButtonCustom from '../../components/buttons/ButtonCustom';
import TextInput from '../../components/inputs/TextInput';
import Navbar from '../../components/Navbar';
import PageWrapper from '../PageWrapper';
import './Document.css';

import { Quill } from 'react-quill-new';
import QuillDocument from '../../components/file_type/QuillDocument';


const Delta = Quill.import('delta');

function Document() {
    const { file_hash } = useParams<{file_hash: string}>()

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState(new Delta())

    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        const fetchDocument = async () => {
            if (isLoading) {
                toast.info("Please wait while the current request is finished.")
                return
            }

            setIsLoading(true)
            console.log("Fetching document content...")

            // API request to fetch document content
            try {
                const resp = await getDocument(file_hash || "")

                // Check if response is valid
                if (resp.status !== 200 || !('data' in resp)) {
                    console.log("Error fetching document content:", 'data' in resp ? resp.data.message : "Unkown error.")
                    toast.error("Error fetching document content.")

                    setIsLoading(false)
                    return
                }

                // Set document data
                setTitle(resp.data.name)
                setContent(new Delta(resp.data.content))

            } catch (e) {
                console.error('Error fetching document content:', e)
                toast.error("Error fetching document content.")

                setIsLoading(false)
                return
            }
            setIsLoading(false)
        }

        fetchDocument()
    }, [])

    // Save document every 10 seconds
    // useEffect(() => {


    // }, [content])

    const handleUpdateTitle = async () => {
        console.log("Updating document title...")

        try {
            // API request to update document title
            const resp = await putUpdateDocumentTitle({hash: file_hash || "", name: title})

            if (resp.status !== 200) {
                console.error("Error renaming document:", 'data' in resp ? resp.data.message : "Unkown error.")
                toast.error("Error renaming document.")
                return
            }

            return true
        } catch (e) {
            console.error("Error updating document title:", e)
            toast.error("Error updating document title.")
        }
    }

    // // Manual Save
    // const handleSave = async () => {
    //     if (isLoading) {
    //         toast.info("Please wait while the current request is finished.")
    //         return
    //     }

    //     setIsLoading(true)
    //     console.log("Saving document...")

    //     try {
    //         // Update document title
    //         const titleUpdateSucess = await handleUpdateTitle()

    //         if (!titleUpdateSucess) {
    //             return
    //         }

    //         // Update document content
    //         const resp = await putUpdateDocumentContent({hash: file_hash || "", content: content})
    //         if (resp.status !== 200) {
    //             console.error("Error renaming document:", 'data' in resp ? resp.data.message : "Unkown error.")
    //             toast.error("Error renaming document.")
    //             return
    //         }

    //         toast.success("Document saved successfully.")
    //     } catch (e) {
    //         console.error("Error saving document changes:", e)
    //     }

    //     setIsLoading(false)
    // }

    return (
        <PageWrapper>
            <Navbar />
                <div className='flex flex-col w-full h-full contain-content p-4 items-center'>
                    <div className='items-start h-full'>
                        <div className='w-fit items-start'>
                            <TextInput
                                name='Document Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Untitled Document'
                                type="text"
                            />
                        </div>

                        <div className='w-full h-full flex flex-col items-center gap-y-4'>
                            {/* <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={ OPTIONS }
                                style={{height: "75vh", overflowY: "scroll"}}
                            /> */}

                            <QuillDocument readOnly={false} content={content} file_hash={file_hash} />

                            {/* <ButtonCustom label="Save" onClick={handleSave} /> */}
                        </div>
                    </div>
            </div>
        </PageWrapper>
    )
}

export default Document