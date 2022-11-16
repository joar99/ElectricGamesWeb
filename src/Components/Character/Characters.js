import React, { useMemo } from "react";
import {Link} from "react-router-dom";
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

    

    /*const data = useFetch(gameControllerUrl)

    useEffect(() => {
        setGames(data)
    },[gameControllerUrl])

    console.log(games)

    /*const {gamesArr} = useFetch(gameControllerUrl);

    useEffect(() => {
        gamesArr()
    },[deleteGameFlag])

    

        /*useEffect(() => {
            useFetch(gameControllerUrl)
        },[deleteGameFlag])*/

    useEffect(() => {
        axios.get(characterControllerUrl)
        .then(response=>setCharacters(response.data))
        .catch(error=>console.log(error))
    },[deleteCharacterFlag])

    const onDeleteCharacter = async (id) => {
        await axios.delete(`${characterControllerUrl}/${id}`)
        .then((response => {setDeleteCharacterFlag(prev=>!prev)}))
        .catch(error => console.log(error))
    }

    const onSearchByName = (searchName) => {
        axios.get(`${characterControllerUrl}/${searchName}`)
        .then(response=>setCharacters(response.data))
        .catch(error=>console.log(error))
    }

    

    return (

        <>
        <div>
            <Link to={`/games/addcharacter`}>Add New Character</Link>
            <SearchChar onSearchByName={onSearchByName}></SearchChar>
        </div>
        <h1 className="main-title">Characters</h1>
        {characters.map(char =>{
                return(
                    <>
                    <CharacterCard character={char} setDeleteCharacterFlag={setDeleteCharacterFlag}/>
                    </>
                )
            })}
        </>

        
    )

}