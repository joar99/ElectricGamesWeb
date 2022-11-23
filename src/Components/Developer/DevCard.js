import React from "react";
import { Link } from "react-router-dom";
import DeleteDev from "./DeleteDev";
import axios from "axios";
import "../../Css/Developer/DevCard.css";

export default function DevCard({ developer, setDeleteDevFlag }) {

    const devControllerUrl = "https://localhost:7127/api/Developers";

    const onDeleteDev = async (id) => {
        await axios.delete(`${devControllerUrl}/${id}`)
            .then((response => { setDeleteDevFlag(prev => !prev) }))
            .catch(error => console.log(error))
    }

    return (

        <>
            <div className="card">
                <div className="card-image">
                    <img src={`https://localhost:7127/images/${encodeURIComponent(developer.image)}`} alt={`https://localhost:7127/images/placeholder.png`} />
                </div>
                <div className="card-overlay">
                    <ul className="card-overlay_list">
                        <h1>{developer.name}</h1>
                        <li className="id">{developer.id}</li>
                        <li>{developer.location}</li>
                    </ul>
                </div>
            </div>
            <ul class="card-overlay-buttons">
                <Link className="edit-dev-link" to={`/developers/${developer.id}`}>Edit Developer</Link>
                <DeleteDev className="delete-dev-btn" onDeleteDev={onDeleteDev} idToDelete={developer.id}></DeleteDev>
            </ul>
        </>

    )

}