import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Game/GameCard.css"


export default function GameCard(props) {


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
            </section>

        </>
    )

}