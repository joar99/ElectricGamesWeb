import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteDev from "./DeleteDeveloper";
import axios from "axios";
import "../../Css/Card.css";

export default function DevCard({ developer, setDeleteDevFlag }) {

    const devControllerUrl = "https://localhost:7127/api/Developers";

    const onDeleteDev = async (id) => {
        await axios.delete(`${devControllerUrl}/${id}`)
            .then((response => { setDeleteDevFlag(prev => !prev) }))
            .catch(error => console.log(error))
    }

    const backgroundLink = `https://localhost:7127/images/${encodeURIComponent(developer.image)}`

    const [popup, setPopup] = useState(false);
    const handleChangePopup = () => setPopup(prev => !prev);

    return (

        <>
            <div className="card" style={{ backgroundImage: `url(${backgroundLink})` }}>
                <div className="card-overlay">
                    <ul class="card-overlay_list">
                        <h1>{developer.name}</h1>
                        <li className="id">{developer.id}</li>
                        <li>{developer.location}</li>
                        <ul class="card-overlay-buttons">
                            <Link className="edit-link" to={`/developers/${developer.id}`}>Edit Developer</Link>
                            <li><button className="popup-delete-btn" onClick={handleChangePopup}>Delete</button></li>
                            {popup === true ?
                                <DeletePopup developer={developer} handleChangePopup={handleChangePopup} onDeleteDev={onDeleteDev} idToDelete={developer.id} /> : <></>}
                        </ul>
                    </ul>
                </div>
            </div>

        </>

    )

}

const DeletePopup = ({ developer, handleChangePopup, onDeleteDev, idToDelete }) => {

    return (
        <>
            <div className="popup-container-delete">
                <button className="popup-container-cancel-btn" onClick={handleChangePopup}>Cancel</button>
                <DeleteDev className="delete-dev-btn" onDeleteDev={onDeleteDev} idToDelete={developer.id} handleChangePopup={handleChangePopup}></DeleteDev>
            </div>
        </>
    )

}
