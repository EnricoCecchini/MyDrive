import React, { useEffect, useState } from 'react'
import PageWrapper from '../../PageWrapper'
import Navbar from '../../../components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import FolderSection from './FolderSection';
import ContextMenu from '../../../components/ContextMenu';
import ButtonCustom from '../../../components/buttons/ButtonCustom';
import { useNavigate, useParams } from 'react-router-dom';
import { getFolderDashboard } from '../../../api/user/dashboardAPI';
import { toast } from 'react-toastify';
import { postCreateDocument } from '../../../api/documents/createDocumentAPI';
import FilesSection from './FilesSection';

function Dashboard() {
    const { folder_hash } = useParams<{ folder_hash: string }>()

    const [folders, setFolders] = useState<any[]>([])
    const [files, setFiles] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)

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
                    className='flex flex-col w-full h-full px-4 gap-y-4  border-2 border-red-500'
                    onContextMenu={(e) => {e.preventDefault(); console.log("Context Menu Opened")}}
                >
                    <h1 className='text-3xl'>
                        Files
                    </h1>
                    <ButtonCustom icon={<AddIcon />} label='New Docs' width='fit' onClick={handleNewDocs} />
                    <ButtonCustom icon={<AddIcon />} label='New Folder' width='fit' onClick={handleNewFolder} />

                    <FolderSection folders={folders} />
                    <FilesSection files={files} />
                </div>
            </PageWrapper>
        </>
    )
}

export default Dashboard