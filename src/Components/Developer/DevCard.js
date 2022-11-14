import React from "react";
import {Link} from "react-router-dom";

export default function DevCard(props) {


    return (
        
        <>
        <img src={`https://localhost:7127/images/${encodeURIComponent(props.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
        <h1>{props.name}</h1>
        <p>{props.location}</p>
        <Link to={`/developers/${props.id}`}>Edit Developer</Link>
        <p>{props.id}</p>
        </>
        
    )

}