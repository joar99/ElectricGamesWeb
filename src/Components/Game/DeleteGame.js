import {useEffect, useState} from "react"

export default function DeleteGame({onDeleteGame, idToDelete}) {
    
    const [id, setId] = useState("");

    useEffect(() => {   
        setId(idToDelete)
    })
    

    const deleteItem = () => {
        onDeleteGame(id)
    }

    return(
        <>
            <button className="popup-container-delete-btn" onClick={deleteItem}>Delete</button>
        </>
    )
}