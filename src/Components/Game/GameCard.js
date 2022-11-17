import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Game/GameCard.css"
import DeleteGame from "./DeleteGame";
import axios from "axios";


export default function GameCard({game, setDeleteGameFlag}) {

    const gameControllerUrl = "https://localhost:7127/api/Games";

    const onDeleteGame = async (id) => {
        await axios.delete(`${gameControllerUrl}/${id}`)
        .then((response => {setDeleteGameFlag(prev=>!prev)}))
        .catch(error => console.log(error))
    }

<<<<<<< HEAD

    return (
        <>
            <section className="card-container">
                <div className="card">
                    <div className="card-image">
                        <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                    </div>
                    <div className="card-overlay">
                        <h1>{props.title}</h1>
                        <p className="id">{props.id}</p>
                        <p>Release Date: {props.releaseDate}</p>
                        <p>Age Limit: {props.esrb}</p>
                        <p>Platform: {props.platform}</p>
                        <p>Developer: {props.developer}</p>
                        <Link className="edit-link" to={`/games/${props.id}`}>Edit Game</Link>
                        <button className="fake-delete-button">Delete</button>
                    </div>
                </div>
=======
    return (
        <>
        <section className="container-box-background">
            <section className="container-box">
                <img src={`https://localhost:7127/images/${encodeURIComponent(game.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                    <section className="information-box">
                        <h1 className="title">{game.title}</h1>
                        <p id="id">{game.id}</p>
                    </section>
            <p>{game.releaseDate}</p>
            <Link to={`/games/${game.id}`}>Edit Game</Link>
            <DeleteGame onDeleteGame={onDeleteGame} idToDelete={game.id}></DeleteGame>
>>>>>>> 4bc92f129c818051326955f1dd61595678f4165d
            </section>

        </>
    )

}