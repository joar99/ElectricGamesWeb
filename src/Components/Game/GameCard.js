import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Game/GameCard.css"


export default function GameCard(props) {

    
    
    return (
        <>
        <section className="container-box-background">
            <section className="container-box">
                <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                    <section className="information-box">
                        <h1 className="title">{props.title}</h1>
                        <p id="id">{props.id}</p>
                        <Link to className="read-more">{props.readMore}Read More</Link>
                    </section>
            <p>{props.releaseDate}</p>
            <Link to={`/games/${props.id}`}>Edit Game</Link>
            
            </section>
        </section>
        </>
    )

}