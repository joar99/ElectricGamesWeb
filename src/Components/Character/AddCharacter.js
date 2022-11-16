import React from "react";
import {useState} from "react";
import axios from "axios";
import "../../Css/Default.css";


export default function AddCharacter() {
    const [isAdded, setIsAdded] = useState(false);
    const [addedChar, setAddedChar] = useState({});

    const charControllerUrl = "https://localhost:7127/api/Characters"

    const [name, setName] = useState("")
    const [game, setGame] = useState("")
    const [weapon, setWeapon] = useState("")

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const handleChangeName = event => setName(event.target.value);
    const handleChangeGame = event => setGame(event.target.value)
    const handleChangeWeapon = event => setWeapon(event.target.value)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    
    const character = {
        id: null,
        Name: name,
        Game: game,
        Image: fileName,
        Weapon: weapon
    }
    
    const postCharacter = async () => {
        await axios.post(charControllerUrl,
            JSON.stringify(character),
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
            <p>Enter Character Name</p>
            <input className="game-title-input" type="text" onChange={handleChangeName}></input>
            <p>Enter Game Character Appears In</p>
            <input className="game-release-input" type="text" onChange={handleChangeGame}></input>
            <p>Enter Weapon of Character</p>
            <input className="game-platform-input" type="text" onChange={handleChangeWeapon}></input>
            <p>Select Image</p>
            <input type="file" onChange={saveFile}></input>
            <button onClick={postCharacter}>Create Character</button>
        </>
    )
}