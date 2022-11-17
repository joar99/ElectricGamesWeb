import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Game/GameCard.css"
import DeleteChar from "./DeleteChar";
import axios from "axios";


export default function CharacterCard({character, setDeleteCharacterFlag}) {

    const characterControllerUrl = "https://localhost:7127/api/Characters";

    const onDeleteCharacter = async (id) => {
        await axios.delete(`${characterControllerUrl}/${id}`)
        .then((response => {setDeleteCharacterFlag(prev=>!prev)}))
        .catch(error => console.log(error))
    }
    
    return (
        <>
        <section className="container-box-background">
            <section className="container-box">
                <img src={`https://localhost:7127/images/${encodeURIComponent(character.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                    <section className="information-box">
                        <h1 className="title">{character.name}</h1>
                        <p id="id">{character.id}</p>
                    </section>
            <p>{character.game}</p>
            <Link to={`/games/${character.id}`}>Edit Character</Link>
            <DeleteChar onDeleteCharacter={onDeleteCharacter} idToDelete={character.id}></DeleteChar>
            </section>
        </section>
        </>
    )

}