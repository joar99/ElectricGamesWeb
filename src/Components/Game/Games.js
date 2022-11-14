import React, { useMemo } from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchGame from "./SearchGame";
import GameCard from "./GameCard";
import DeleteGame from "./DeleteGame";
import useFetch from "../../Hooks/useFetch";



export default function Games() {

    const [deleteGameFlag, setDeleteGameFlag] = useState(false);
    const [games, setGames] = useState([]);
    
    const gameControllerUrl = "https://localhost:7127/api/Games";

    

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
        axios.get(gameControllerUrl)
        .then(response=>setGames(response.data))
        .catch(error=>console.log(error))
    },[deleteGameFlag])

    const onDeleteGame = async (id) => {
        await axios.delete(`${gameControllerUrl}/${id}`)
        .then((response => {setDeleteGameFlag(prev=>!prev)}))
        .catch(error => console.log(error))
    }

    const onSearchByTitle = (searchTitle) => {
        axios.get(`${gameControllerUrl}/${searchTitle}`)
        .then(response=>setGames(response.data))
        .catch(error=>console.log(error))
    }

    

    return (

        <>
        <div>
            <Link to={`/games/addgame`}>Add New Game</Link>
            <SearchGame onSearchByTitle={onSearchByTitle}></SearchGame>
        </div>
        <h1>Games</h1>
        {games.map(game =>{
                return(
                    <>
                    <GameCard {...game}/>
                    <DeleteGame onDeleteGame={onDeleteGame} idToDelete={game.id} />
                    </>
                )
            })}
        </>

        
    )

}

