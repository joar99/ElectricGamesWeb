import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchDeveloper from "./SearchDeveloper";
import DeveloperCard from "./DeveloperCard"
import DeleteDev from "./DeleteDeveloper";
import "../../Css/Component.css";
import "../../Css/Card.css";


export default function Developers() {

    const [deleteDevFlag, setDeleteDevFlag] = useState(false);
    const [showAllFlag, setShowAllFlag] = useState(false);
    const handleChangeShowAll = useCallback(() => setShowAllFlag(prev => !prev))
    const [developers, setDevelopers] = useState([]);

    const devControllerUrl = "https://localhost:7127/api/Developers";

    useEffect(() => {
        axios.get(devControllerUrl)
            .then(response => setDevelopers(response.data))
            .catch(error => console.log(error))
    }, [deleteDevFlag, showAllFlag])

    const onSearchByName = (searchName) => {
        axios.get(`${devControllerUrl}/name/${searchName}`)
            .then(response => setDevelopers(response.data))
            .catch(error => console.log(error))
    }

    const onSearchById = async (id) => {
        await axios
            .get(`${devControllerUrl}/${id}`)
            .then(response => setDevelopers([response.data]))
            .catch(err => console.log(err))
    }

    return (

        <>
           <Link className="add-new-btn" to={`/games/addgame`}>
                <button>
                    
                </button>
            </Link>

            <h1 className="main-title">Developers</h1>
            <SearchDeveloper onSearchByName={onSearchByName} onSearchById={onSearchById} onChange={handleChangeShowAll}></SearchDeveloper>
            <section className="card-container">

                {developers.map(dev => {
                    return (
                        <>
                            <DeveloperCard developer={dev} setDeleteDevFlag={setDeleteDevFlag} />
                        </>
                    )
                })}
            </section>
            

        </>

    )

}