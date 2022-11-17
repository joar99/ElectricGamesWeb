import {useEffect, useState} from "react"

export default function DeleteChar({onDeleteCharacter, idToDelete}) {
    
    const [id, setId] = useState("");

    useEffect(() => {   
        setId(idToDelete)
    })
    
    const deleteItem = () => {
        onDeleteCharacter(id)
    }

    return(
        <>
            <button id="delete-game-btn" onClick={deleteItem}>Delete</button>
        </>
    )
}