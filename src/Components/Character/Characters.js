import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import "../../Css/Component.css";
import "../../Css/Card.css";
import DeleteCharacter from "./DeleteCharacter";
import CharacterCard from "./CharacterCard";
import SearchCharacter from "./SearchCharacter";



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
           <Link className="add-new-btn" to={`/characters/addcharacter`}>
                <button>
                    
                </button>
            </Link>

            <h1 className="main-title">Characters</h1>
            <SearchCharacter onSearchByName={onSearchByName} onSearchById={onSearchById} onChange={handleChangeShowAll}></SearchCharacter>
            <section className="card-container">
                {characters.map(char => {
                    return (
                        <>
                            <CharacterCard character={char} setDeleteCharacterFlag={setDeleteCharacterFlag} />
                        </>
                    )
                })}
            </section>

        </>

    )

}