import React, { useMemo } from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchDev from "./SearchDev";
import DevCard from "./DevCard"
import DeleteDev from "./DeleteDev";



export default function Developers() {

    const [deleteDevFlag, setDeleteDevFlag] = useState(false);
    const [developers, setDevelopers] = useState([]);
    
    const devControllerUrl = "https://localhost:7127/api/Developers";

    useEffect(() => {
        axios.get(devControllerUrl)
        .then(response=>setDevelopers(response.data))
        .catch(error=>console.log(error))
    },[deleteDevFlag])

    const onDeleteDev = async (id) => {
        await axios.delete(`${devControllerUrl}/${id}`)
        .then((response => {setDeleteDevFlag(prev=>!prev)}))
        .catch(error => console.log(error))
    }

    const onSearchByName = (searchName) => {
        axios.get(`${devControllerUrl}/${searchName}`)
        .then(response=>setDevelopers(response.data))
        .catch(error=>console.log(error))
    }

    

    return (

        <>
        <div>
            <Link to={`/developers/adddeveloper`}>Add New Developer</Link>
            <SearchDev onSearchByName={onSearchByName}></SearchDev>
        </div>
        <h1>Developers</h1>
        {developers.map(dev =>{
                return(
                    <>
                    <DevCard {...dev}/>
                    <DeleteDev onDeleteDev={onDeleteDev} idToDelete={dev.id} />
                    </>
                )
            })}
        </>

        
    )

}