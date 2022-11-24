import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Css/Background.css";
import "../../Css/Game/Games.css";
import GameCard from "./GameCard";
import SearchGame from "./SearchGame";



export default function Games() {

    const [deleteGameFlag, setDeleteGameFlag] = useState(false);
    const [showAllFlag, setShowAllFlag] = useState(false);
    const handleChangeShowAll = useCallback(() => setShowAllFlag(prev => !prev))
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

            <Link className="add-new-btn" to={`/games/addgame`}>
                <button>
                    
                </button>
            </Link>

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

        </>
    )

}

