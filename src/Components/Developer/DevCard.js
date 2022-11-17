import React from "react";
import {Link} from "react-router-dom";
import DeleteDev from "./DeleteDev";
import axios from "axios";

export default function DevCard({developer, setDeleteDevFlag}) {

    const devControllerUrl = "https://localhost:7127/api/Developers";

    const onDeleteDev = async (id) => {
        await axios.delete(`${devControllerUrl}/${id}`)
        .then((response => {setDeleteDevFlag(prev=>!prev)}))
        .catch(error => console.log(error))
    }

    return (
        
        <>
        <img src={`https://localhost:7127/images/${encodeURIComponent(developer.image)}`} alt={`https://localhost:7127/images/placeholder.png`} ></img>
        <h1>{developer.name}</h1>
        <p>{developer.location}</p>
        <Link to={`/developers/${developer.id}`}>Edit Developer</Link>
        <DeleteDev onDeleteDev={onDeleteDev} idToDelete={developer.id}></DeleteDev>
        <p>{developer.id}</p>
        </>
        
    )

}