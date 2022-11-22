import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchGame from "./SearchGame";
import GameCard from "./GameCard";
import DeleteGame from "./DeleteGame";
import "../../Css/Game/Games.css";
import "../../Css/Background.css";



export default function Games() {

    const [deleteGameFlag, setDeleteGameFlag] = useState(false);
    const [showAllFlag, setShowAllFlag] = useState(false);
    const handleChangeShowAll = useCallback(() => setShowAllFlag(prev=>!prev))
    const [games, setGames] = useState([]);

    const gameControllerUrl = "https://localhost:7127/api/Games";

    useEffect(() => {
        axios.get(gameControllerUrl)
            .then(response => setGames(response.data))
            .catch(error => console.log(error))
    }, [deleteGameFlag, showAllFlag])

    const onSearchByTitle = (searchTitle) => {
        axios.get(`${gameControllerUrl}/title/${searchTitle}`)
            .then(response => setGames(response.data))
            .catch(error => console.log(error))
    }

    const onSearchById = async (id) => {
            await axios
            .get(`${gameControllerUrl}/${id}`)
            .then(response => setGames([response.data]))
            .catch(err => console.log(err))
    }

    return (

        <>

            <h1 className="main-title">Games</h1>
            <SearchGame onSearchByTitle={onSearchByTitle} onSearchById={onSearchById} onChange={handleChangeShowAll}></SearchGame>
            <section className="card-container">
                {games.map(game => {
                    return (
                        <>
                            <GameCard game={game} setDeleteGameFlag={setDeleteGameFlag} />
                        </>
                    )
                })}
            </section>
            <section className="add-new-btn">
                <Link className="add-new-btn-open" to={`/games/addgame`}>+ Add New Game</Link>
            </section>

        </>
    )

}

