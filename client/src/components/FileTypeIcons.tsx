import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BorderAllIcon from '@mui/icons-material/BorderAll';

const lg_size = "8rem"
const md_size = "6rem"
const sm_size = "3rem"

export const FileTypeIcon: Record<number, any> = {
    1: {icon_lg: <TextSnippetIcon  sx={{fontSize: lg_size}} />, icon_sm: <TextSnippetIcon  sx={{fontSize: sm_size}} />, name: "document"},
    2: {icon_lg: <BorderAllIcon  sx={{fontSize: lg_size}} />, icon_sm: <BorderAllIcon  sx={{fontSize: sm_size}} />, name: "sheet"}
}