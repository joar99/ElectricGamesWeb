import React from "react";
import { Link } from "react-router-dom";


export default function GameCard(props) {

    
    
    return (
        <>
        <section className="container-box-background">
            <section className="container-box">
                <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
                    <section className="information-box">
                        <h1 className="title">{props.title}</h1>
                        <p id="id">{props.id}</p>
                    </section>

            <p>{props.releaseDate}</p>
            <Link to={`/games/${props.id}`}>Edit Game</Link>
            
            </section>
        </section>
        </>
    )

}