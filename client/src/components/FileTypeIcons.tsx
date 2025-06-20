import BorderAllIcon from '@mui/icons-material/BorderAll';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const sizeMap = {
  lg: "8rem",
  md: "6rem",
  sm: "3rem"
};

export const FileTypeIcon = (
    typeID: number,
    size: "lg" | "md" | "sm" | string = "md"
) => {
    let fontSize

    switch (size) {
        case "lg":
            fontSize = sizeMap.lg
            break
        case "md":
            fontSize = sizeMap.md
            break
        case "sm":
            fontSize = sizeMap.sm
            break
        default:
            fontSize = size ? size : sizeMap.md
    }

    switch (typeID) {
        case 1:
            return {
                icon: <TextSnippetIcon sx={{ fontSize: fontSize }} />,
                name: "document"
            };
        case 2:
            return {
                icon: <BorderAllIcon sx={{ fontSize: fontSize }} />,
                name: "sheet"
            };
        default:
            return {
                icon: <TextSnippetIcon sx={{ fontSize: fontSize }} />,
                name: "document"
            };
    }

}