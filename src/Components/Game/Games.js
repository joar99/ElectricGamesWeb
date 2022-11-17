import React, { useMemo } from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchGame from "./SearchGame";
import GameCard from "./GameCard";
import DeleteGame from "./DeleteGame";
import "../../Css/Game/Games.css";



export default function Games() {

    const [deleteGameFlag, setDeleteGameFlag] = useState(false);
    const [games, setGames] = useState([]);
    
    const gameControllerUrl = "https://localhost:7127/api/Games";

    /*const {arr, getData} = useFetch(gameControllerUrl);

    useEffect(() => {
        getData()
    },[getData, deleteGameFlag])*/

    

    useEffect(() => {
        axios.get(gameControllerUrl)
        .then(response=>setGames(response.data))
        .catch(error=>console.log(error))
    },[deleteGameFlag])

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
        <h1 className="main-title">Games</h1>
        <section className="card-container">
        {games.map(game =>{
                return(
                    <>
                    <GameCard game={game} setDeleteGameFlag={setDeleteGameFlag}/>
                    </>
                )
            })}
        </section>

        </>
    )

}

