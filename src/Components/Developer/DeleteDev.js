import {useEffect, useState} from "react"

export default function DeleteDev({onDeleteDev, idToDelete}) {
    
    const [id, setId] = useState("");

    useEffect(() => {
        setId(idToDelete)
    })
    

    const deleteItem = () => {
        onDeleteDev(id)
    }

    return(
        <>
            <button id="delete-game-btn" onClick={deleteItem}>Delete</button>
        </>
    )
}