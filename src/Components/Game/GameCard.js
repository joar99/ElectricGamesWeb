import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Game/GameCard.css"
import DeleteGame from "./DeleteGame";
import axios from "axios";
import "../../Css/Game/Button.css";


export default function GameCard({ game, setDeleteGameFlag }) {

    const gameControllerUrl = "https://localhost:7127/api/Games";

    const onDeleteGame = async (id) => {
        await axios.delete(`${gameControllerUrl}/${id}`)
            .then((response => { setDeleteGameFlag(prev => !prev) }))
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className="card">
                <div className="card-image">
                    <img src={`https://localhost:7127/images/${encodeURIComponent(game.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                </div>
                <div className="card-overlay">
                    <h1>{game.title}</h1>
                    <p className="id">{game.id}</p>
                    <p>Release Date: {game.releaseDate}</p>
                    <p>Age Limit: {game.esrb}</p>
                    <p>Platform: {game.platform}</p>
                    <p>Developer: {game.developer}</p>
                    <Link to={`/games/${game.id}`}>Edit Game</Link>
                    <DeleteGame onDeleteGame={onDeleteGame} idToDelete={game.id}></DeleteGame>
                </div>
            </div>


        </>
    )

}