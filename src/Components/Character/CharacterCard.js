import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Game/GameCard.css"
import DeleteChar from "./DeleteChar";
import axios from "axios";


export default function CharacterCard({ character, setDeleteCharacterFlag }) {

    const characterControllerUrl = "https://localhost:7127/api/Characters";

    const onDeleteCharacter = async (id) => {
        await axios.delete(`${characterControllerUrl}/${id}`)
            .then((response => { setDeleteCharacterFlag(prev => !prev) }))
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className="card">
                <div className="card-image">
                    <img src={`https://localhost:7127/images/${encodeURIComponent(character.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                </div>
                <div className="card-overlay">
                    <h1>{character.name}</h1>
                    <p id="id">{character.id}</p>
                    <p>{character.game}</p>
                    <Link to={`/games/${character.id}`}>Edit Character</Link>
                    <DeleteChar onDeleteCharacter={onDeleteCharacter} idToDelete={character.id}></DeleteChar>
                </div>

            </div>
        </>
    )

}