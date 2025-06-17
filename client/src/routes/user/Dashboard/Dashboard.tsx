import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postCreateDocument } from '../../../api/documents/http/createDocumentAPI';
import { getFolderDashboard } from '../../../api/user/dashboardAPI';
import Navbar from '../../../components/Navbar';
import ButtonCustom from '../../../components/buttons/ButtonCustom';
import TextInput from '../../../components/inputs/TextInput';
import PageWrapper from '../../PageWrapper';
import FilesSection from './FilesSection';
import FolderSection from './FolderSection';

function Dashboard() {
    const { folder_hash } = useParams<{ folder_hash: string }>()

    const [folders, setFolders] = useState<any[]>([])
    const [files, setFiles] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>()

    const navigator = useNavigate()

    useEffect(() => {
        const fetchCurrFolderContent = async () => {
            console.log("Fetching content for current folder...")

            if (isLoading) {
                toast.info("Please wait while the current request is finished.")
                return
            }

            setIsLoading(true)

            try {
                console.log("Folder", folder_hash)
                const resp = await getFolderDashboard({ folder_hash: folder_hash || "root" })

                if (resp.status !== 200 || !('data' in resp)) {
                    console.error("Error fetching folder content:", 'data' in resp ? resp.data.message : "Unkown error.")
                    return
                } else if (!('data' in resp)) {
                    console.error("Error fetching folder content: Response does not contain data.")
                    return
                }

                setFolders(resp.data.data.folders.map((item: any) => {
                    return {
                        name: item.name,
                        hash: item.hash,
                        date_created: item.created_at,
                        tags: item.tags.map((tag: any) => {
                            return {
                                id: tag.id,
                                name: tag.name
                            }
                        })
                    }
                }))

                setFiles(resp.data.data.files.map((item: any) => {
                    return {
                        name: item.name,
                        hash: item.file_hash,
                        type: item.type,
                        date_created: item.date_created,
                        type_name: item.type_name,
                        tags: item.tags.map((tag: any) => {
                            return {
                                id: tag.id,
                                name: tag.name
                            }
                        })
                    }
                }))

                setFolderName(resp.data.data.curr_folder)

            } catch (e) {
                console.log("Error fetching folder content:", e)
            }

            setIsLoading(false)
        }

        fetchCurrFolderContent()
        console.log(files)
    }, [folder_hash])


    const handleNewDocs = async () => {
        console.log("Create new docs...")
        if (isLoading) {
            toast.info("Please wait while the current request is finished.")
            return
        }

        setIsLoading(true)

        try {
            const resp = await postCreateDocument({
                folder_hash: folder_hash || "root",
                name: "New Document",
                type: 1
            })
            console.log("Response from create document:", resp)

            if (resp.status !== 200 || !('data' in resp)) {
                console.error("Error creating document:", 'data' in resp ? resp.data.message : "Unkown error.")
                return
            }

            toast.success("Document created successfully!")
            setTimeout(() => {}, 2000)

            navigator(`/document/${resp.data.doc_hash}`)

        } catch (e) {
            console.log("Error creating new document:", e)
            toast.error("Error creating document. Please try again.")
        }

        setIsLoading(false)
    }

    const handleNewFolder = () => {
        console.log("Creating new folder...")
        if (isLoading) {
            toast.info("Please wait while the current request is finished.")
            return
        }

        setIsLoading(true)


        setIsLoading(false)
    }

    // const contextMenuOptions = [
    //     {id: 1, name: "New Docs"},
    //     {id: 2, name: "New Sheet"},
    //     {id: 3, name: "Upload File"}
    // ]

    return (
        <>
            <PageWrapper>
                <Navbar />
                <div
                    className='p-4'
                    onContextMenu={(e) => {e.preventDefault(); console.log("Context Menu Opened")}}
                >
                    <div className="flex flex-col p-4 w-full h-full gap-y-4 border rounded-lg border-gray-300 shadow-2xl">
                        <div className='flex flex-row w-fit justify-center gap-x-2'>

                            {
                                folder_hash ?
                                <>
                                    <TextInput
                                        name='name'
                                        placeholder='Folder Name'
                                        value={folderName}

                                    />
                                    <button
                                        className='h-full w-fit text-nowrap text-center p-2 px-4 text-white text-lg rounded-lg bg-blue-400 hover:bg-blue-600'
                                    >
                                        Update
                                    </button>
                                </> : <>
                                    <>
                                        <TextInput
                                            name='name'
                                            placeholder='Folder Name'
                                            value="root"
                                            disabled={true}
                                        />
                                    </>
                                </>
                            }
                        </div>

                        <ButtonCustom icon={<AddIcon />} label='New Docs' width='fit' onClick={handleNewDocs} />
                        <ButtonCustom icon={<AddIcon />} label='New Folder' width='fit' onClick={handleNewFolder} />

                        <FolderSection folders={folders} />
                        <br />
                        <FilesSection files={files} />
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default Dashboard