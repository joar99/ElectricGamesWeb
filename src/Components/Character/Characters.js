import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import "../../Css/Game/Games.css";
import "../../Css/Character/Characters.css";
import DeleteChar from "./DeleteChar";
import CharacterCard from "./CharacterCard";
import SearchChar from "./SearchChar";



export default function Characters() {

    const [deleteCharacterFlag, setDeleteCharacterFlag] = useState(false);
    const [showAllFlag, setShowAllFlag] = useState(false);
    const handleChangeShowAll = useCallback(() => setShowAllFlag(prev=>!prev))
    const [characters, setCharacters] = useState([]);

    const characterControllerUrl = "https://localhost:7127/api/Characters";

    useEffect(() => {
        axios.get(characterControllerUrl)
        .then(response=>setCharacters(response.data))
        .catch(error=>console.log(error))
    },[deleteCharacterFlag, showAllFlag])

    const onSearchByName = (searchName) => {
        axios.get(`${characterControllerUrl}/name/${searchName}`)
        .then(response=>setCharacters(response.data))
        .catch(error=>console.log(error))
    }

    const onSearchById = async (id) => {
        await axios
        .get(`${characterControllerUrl}/${id}`)
        .then(response => setCharacters([response.data]))
        .catch(err => console.log(err))
    }

    return (

        <>

            <h1 className="main-title">Characters</h1>
            <SearchChar onSearchByName={onSearchByName} onSearchById={onSearchById} onChange={handleChangeShowAll}></SearchChar>
            <section className="card-container">
                {characters.map(char => {
                    return (
                        <>
                            <CharacterCard character={char} setDeleteCharacterFlag={setDeleteCharacterFlag} />
                        </>
                    )
                })}
            </section>
            <section className="add-new-char-btn">
                <Link className="add-new-char-btn-open" to={`/games/addcharacter`}>Add New Character</Link>
            </section>

        </>

    )

}