import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

function Loading() {
    return (
        <>
            <div className='flex flex-row w-full bg-indigo-400 text-white text-4xl items-center justify-center gap-x-2 px-4 py-2 rounded-xl'>
                <span>Loading...</span>
                <span className='flex animate-spin h-8 w-8 items-center justify-center'><HourglassBottomIcon sx={{fontSize: "2rem"}} /></span>
            </div>
        </>
    )
}

export default Loading