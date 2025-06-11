import type React from "react";

interface ContextMenuItemInterface {
    name: string;
}

export const ContextMenuItem: React.FC<ContextMenuItemInterface> = ({name}) => {
    return (
        <div>{name}</div>
    )
}

export default ContextMenuItem