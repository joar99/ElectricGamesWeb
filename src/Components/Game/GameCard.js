import React from "react";
import { Link } from "react-router-dom";


export default function GameCard(props) {

    
    
    return (
        <>
        <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
        <h1>{props.title}</h1>
        <p>{props.releaseDate}</p>
        <Link to={`/games/${props.id}`}>Edit Game</Link>
        <p>{props.id}</p>
        </>
    )

}