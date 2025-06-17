import { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDocument } from '../../api/documents/http/getDocumentAPI';
import { putUpdateDocumentTitle } from '../../api/documents/http/updateDocumentTitleAPI';
import TextInput from '../../components/inputs/TextInput';
import Navbar from '../../components/Navbar';
import PageWrapper from '../PageWrapper';
import './Document.css';

import Quill from 'quill';
import QuillDocument from '../../components/file_type/QuillDocument';


const Delta = Quill.import('delta');

function Document() {
    const { file_hash } = useParams<{file_hash: string}>()

    const [title, setTitle] = useState<string>("")
    const [debouncedTitle, setDebouncedTitle] = useState<string>(title)

    let [composedDelta, setComposedDelta] = useState(new Delta())

    // Util vars
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isFirstRun = useRef<boolean>(true)

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

                // Parse existing data to JSON and create temp composed delta
                const parsedData = JSON.parse(resp.data.content)
                let t_composed = new Delta

                // Compose existing delta and set
                parsedData.map((d: any) => {
                    t_composed = t_composed.compose(d)
                })
                setComposedDelta(t_composed)

            } catch (e) {
                console.error('Error fetching document content:', e)
                toast.error("Error fetching document content.")

                setIsLoading(false)
                return
            }
            setIsLoading(false)
        }

        fetchDocument()
    }, [file_hash])

    // Debounce title 500ms after typing stops
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedTitle(title)
        }, 500)

        return () => clearTimeout(timeout)
    }, [title])


    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        }

        const handleUpdateTitle = async () => {
            if (!file_hash || !debouncedTitle) return
            else if (isLoading) {
                toast.info("Please wait while the current request is finished.")
                return
            }

            setIsLoading(true)

            try {
                console.log("Updating document title...")

                // API request to update document title
                const resp = await putUpdateDocumentTitle({hash: file_hash || "", name: debouncedTitle})

                if (resp.status !== 200) {
                    console.error("Error renaming document:", 'data' in resp ? resp.data.message : "Unkown error.")
                    toast.error("Error renaming document.")
                }

            } catch (e) {
                console.error("Error updating document title:", e)
                toast.error("Error updating document title.")
            }

            setIsLoading(false)
        }

        handleUpdateTitle()
    }, [debouncedTitle])


    return (
        <PageWrapper>
            <Navbar />
                <div className='flex flex-col w-full h-full contain-content p-4 items-center'>
                    <div className='items-start h-full w-[75%] px-8'>
                        <div className='w-fit items-start'>
                            <TextInput
                                name='Document Title'
                                value={title}
                                onChange={(e) => {setTitle(e.target.value)}}
                                placeholder='Untitled Document'
                                type="text"
                            />
                        </div>

                        <div className='w-full h-full flex flex-col items-center gap-y-4'>
                            <QuillDocument readOnly={false} content={composedDelta} file_hash={file_hash} />
                        </div>
                    </div>
            </div>
        </PageWrapper>
    )
}

export default Document