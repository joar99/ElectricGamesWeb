import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../Css/Game/GameCard.css"
import DeleteGame from "./DeleteGame";
import axios from "axios";




export default function GameCard({ game, setDeleteGameFlag }) {

    const gameControllerUrl = "https://localhost:7127/api/Games";

    const gamesUrl = "https://localhost/7127/games";

    const [img, setImg] = useState();

    const onDeleteGame = async (id) => {
        await axios.delete(`${gameControllerUrl}/${id}`)
            .then((response => { setDeleteGameFlag(prev => !prev) }))
            .catch(error => console.log(error))
    }

    const backgroundLink = `https://localhost:7127/images/${encodeURIComponent(game.image)}`

    return (
        <>
            <div className="card" style={{ backgroundImage: `url(${backgroundLink})` }}>
                    <div className="card-overlay">
                        <ul class="card-overlay_list">
                            <h1>{game.title}</h1>
                            <li className="id">{game.id}</li>
                            <li>Release Date: {game.releaseDate}</li>
                            <li>Age Limit: {game.esrb}</li>
                            <li>Platform: {game.platform}</li>
                            <li>Developer: {game.developer}</li>
                            <ul class="card-overlay-buttons">
                                <li><Link className="edit-game-link" to={`/games/${game.id}`}>Edit Game</Link></li>
                                <li><DeleteGame onDeleteGame={onDeleteGame} idToDelete={game.id}></DeleteGame></li>
                            </ul>
                        </ul>
                    </div>
                </div>
            


        </>
    )

}

