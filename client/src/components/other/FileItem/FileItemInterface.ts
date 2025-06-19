export interface FileItemInterface {
    name: string
    hash: string
    type: number
    date_created: string
    handleClick: (type: number, hash: string) => void
}