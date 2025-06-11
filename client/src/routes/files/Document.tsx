import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';
import TextInput from '../../components/inputs/TextInput'
import Navbar from '../../components/Navbar'
import PageWrapper from '../PageWrapper'
import { useParams } from 'react-router-dom';


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

function Document() {
    const { file_hash } = useParams<{file_hash: string}>()

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchDocument = async () => {
            setIsLoading(true)
            console.log("Fetching document content...")

            // API request to fetch document content
            try {

            } catch (e) {
                console.error('Error fetching document content:', e)
            }

            setIsLoading(false)
        }

        fetchDocument()
    }, [file_hash])

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

                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={ OPTIONS }
                            style={{height: "80vh", overflowY: "scroll"}}
                        />
                    </div>
            </div>
        </PageWrapper>
    )
}

export default Document