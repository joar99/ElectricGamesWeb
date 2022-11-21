import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import "../../Css/Game/Games.css";
import DeleteChar from "./DeleteChar";
import CharacterCard from "./CharacterCard";
import SearchChar from "./SearchChar";



export default function Characters() {

    const [deleteCharacterFlag, setDeleteCharacterFlag] = useState(false);
    const [characters, setCharacters] = useState([]);

    const characterControllerUrl = "https://localhost:7127/api/Characters";

    useEffect(() => {
        axios.get(characterControllerUrl)
            .then(response => setCharacters(response.data))
            .catch(error => console.log(error))
    }, [deleteCharacterFlag])

    const onSearchByName = (searchName) => {
        axios.get(`${characterControllerUrl}/${searchName}`)
            .then(response => setCharacters(response.data))
            .catch(error => console.log(error))
    }



    return (

        <>

            <h1 className="main-title">Characters</h1>
            <SearchChar onSearchByName={onSearchByName}></SearchChar>
            <section className="card-container">
                {characters.map(char => {
                    return (
                        <>
                            <CharacterCard character={char} setDeleteCharacterFlag={setDeleteCharacterFlag} />
                        </>
                    )
                })}
            </section>
            <section className="add-new-character">
                <Link to={`/games/addcharacter`}>Add New Character</Link>
            </section>

        </>

    )

}