import React from "react";
import {useState} from "react";
import axios from "axios";

export default function AddDev() {
    const [isAdded, setIsAdded] = useState(false);
    const [addedDev, setAddedDev] = useState({});

    const devControllerUrl = "https://localhost:7127/api/Developers"

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const handleChangeName = event => setName(event.target.value);
    const handleChangeLocation = event => setLocation(event.target.value)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    
    const dev = {
        id: null,
        Image: fileName,
        Name: name,
        Location: location
    }
    
    const postDev = async () => {
        await axios.post(devControllerUrl,
            JSON.stringify(dev),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response)=>{
                console.log(response)
            })
            .catch(error=>console.log(error));

            const formData = new FormData();
            formData.append("formFile", file)
            formData.append("fileName", fileName)
    
            try {
            const res = axios.post("https://localhost:7127/api/file", formData);
            } catch (ex) {
            console.log(ex)
            }
        }

    return (
        <>
        <p>Enter Developer Name</p>
        <input className="game-title-input" type="text" onChange={handleChangeName}></input>
        <p>Enter Developer Location</p>
        <input className="game-release-input" type="text" onChange={handleChangeLocation}></input>
        <input type="file" onChange={saveFile}></input>
        <button onClick={postDev}>Create Developer</button>
        </>
    )
}