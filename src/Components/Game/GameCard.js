import React from "react";
import { Link } from "react-router-dom";


export default function GameCard(props) {

    
    
    return (
        <>
        <section class="section-box-background">
            <section class="section-box">
                <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                    <section class="information-box">
                        <h1 class="title">{props.title}</h1>
                        <p id="id">{props.id}</p>
                    </section>

            <p>{props.releaseDate}</p>
            <Link to={`/games/${props.id}`}>Edit Game</Link>
            
            </section>
        </section>
        </>
    )

}