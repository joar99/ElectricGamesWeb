import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Game/GameCard.css"
import "../../Css/Character/CharacterCard.css"
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
                    <ul class="card-overlay_list">
                        <h1>{character.name}</h1>
                        <li className="id">{character.id}</li>
                        <li>Game: {character.game}</li>
                        <li>Weapon: {character.weapon}</li>
                        <ul class="card-overlay-buttons">
                            <li><Link className="edit-character-link" to={`/characters/${character.id}`}>Edit Character</Link></li>
                            <li><DeleteChar onDeleteCharacter={onDeleteCharacter} idToDelete={character.id}></DeleteChar></li>
                        </ul>
                    </ul>
                </div>
            </div>

        </>
    )

}