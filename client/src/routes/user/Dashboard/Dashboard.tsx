import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postCreateDocument } from '../../../api/documents/http/createDocumentAPI';
import { getFolderDashboard } from '../../../api/user/dashboard/getDashboardAPI';
import Navbar from '../../../components/Navbar';
import ButtonCustom from '../../../components/buttons/ButtonCustom';
import TextInput from '../../../components/inputs/TextInput';
import PageWrapper from '../../PageWrapper';
import FilesSection from './FilesSection';
import FolderSection from './FolderSection';
import SearchInput from '../../../components/inputs/SearchInput';
import { getSearchResults } from '../../../api/user/dashboard/getSearchAPI';

function Dashboard() {
    const { folder_hash } = useParams<{ folder_hash: string }>()

    const [folders, setFolders] = useState<any[]>([])
    const [files, setFiles] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>("")

    const searchField = useRef<string>("")
    const [searchResults, setSearchResults] = useState<[any]>()

    const searchTimeoutDebounce = useRef<any>(null)
    const searchDebounce = useRef<string>(searchField.current)
    const prevSearchField = useRef<string>("")

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
        console.log("items", files)
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
                setIsLoading(false)
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

    // Handle debounce for searchField
    const handleSearchDebounce = async (e: any) => {
        console.log("Searching: ", searchDebounce.current, isLoading)
        searchField.current = e.target.value

        if (searchTimeoutDebounce.current) {
            clearTimeout(searchTimeoutDebounce.current)
        }

        searchTimeoutDebounce.current = setTimeout(async () => {
            console.log("Debouncing searchField")
            searchDebounce.current = searchField.current
            await handleSearch()
        }, 500)
    }

    // Handle search API request
    const handleSearch = async () => {
        if (isLoading) return

        setIsLoading(true)

        // Check if searchDebounce === prevSearchField to only get new items
        if(searchDebounce === prevSearchField) {
            console.log("Getting more results")
        } else {
            console.log("Getting new results")
            const resp = await getSearchResults({text: searchDebounce.current, tags: [], limit: 20, offset:0})

            if (resp.status !== 200 || !('data' in resp)) {
                console.error("Error getting search results:", 'data' in resp ? resp.data.message : "Unkown error.")
                setIsLoading(false)
                return
            }

            const search_folders = resp.data.data.folders.map((item: any) => {
                return {
                    name: item.name,
                    hash: item.hash,
                    date_created: item.created_at,
                    date_updated: item.date_updated,
                    is_folder: true,
                    tags: item.tags.map((tag: any) => {
                        return {
                            id: tag.id,
                            name: tag.name
                        }
                    })
                }
            })

            const search_files = resp.data.data.files.map((item: any) => {
                return {
                    name: item.name,
                    hash: item.file_hash,
                    type: item.type,
                    date_created: item.date_created,
                    type_name: item.type_name,
                    location: item.folder_name,
                    date_updated: item.date_updated,
                    is_folder: false,
                    tags: item.tags.map((tag: any) => {
                        return {
                            id: tag.id,
                            name: tag.name
                        }
                    })
                }
            })

            let tempRes = search_folders.concat(search_files)
            setSearchResults(tempRes)
        }
        setIsLoading(false)
    }

    const handleClickOption = (e: any) => {
        console.log("Clicked Item:", e)

        if (e.is_folder) navigator(`/folders/${e.hash}`)
        else if (e.type === 1) navigator(`/document/${e.hash}`)
        else console.log("Clicked", e)
    }

    return (
        <>
            <PageWrapper>
                <Navbar />
                <div
                    className='p-4 flex flex-row w-full'
                    onContextMenu={(e) => {e.preventDefault(); console.log("Context Menu Opened")}}
                >
                    <div className="flex flex-col p-1 py-4 lg:px-8 w-full h-full gap-y-4 border rounded-lg border-gray-300 shadow-2xl item">
                        <SearchInput onChange={handleSearchDebounce} items={searchResults} onClickItem={handleClickOption} />

                        <div className='flex flex-row w-fit justify-center gap-x-2'>

                            {
                                folder_hash ?
                                <>
                                    <TextInput
                                        name='name'
                                        placeholder='Folder Name'
                                        value={folderName}
                                        onChange={(e) => {setFolderName(e.target.value)}}
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

                        <div className='flex flex-row w-full items-start gap-x-2'>
                            <ButtonCustom icon={<AddIcon />} label='New Docs' width='fit' onClick={handleNewDocs} />
                            <ButtonCustom icon={<AddIcon />} label='New Folder' width='fit' onClick={handleNewFolder} />
                        </div>

                        <FolderSection folders={folders} />

                        <hr className='my-4 bg-gray-600' />

                        <FilesSection files={files} />
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default Dashboard