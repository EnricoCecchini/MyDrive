import React, { useState } from 'react'

interface ContextMenuInterface {
    options: Array<{id: number, name: string}>
}

export const ContextMenu: React.FC<ContextMenuInterface> = ({ options }) => {
    const [isClicked, setIsClicked] = useState(false)
    const [points, setPoints] = useState({x: 0, y: 0})

    return (
        <div
            className=''
        >
            {options.map((item, index) => {
                return <div
                    key={`cont-${index}`}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        console.log("Opening context menu")
                        setPoints({
                            x: e.pageX,
                            y: e.pageY
                        })
                    }}
                >

                </div>
            })}
        </div>
    )
}

export default ContextMenu